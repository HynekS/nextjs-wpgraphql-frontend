import fetch from "isomorphic-fetch";
import type {
  ExcavationsQuery,
  AllExcavationsSlugsQuery,
  ExcavationQuery,
  AnnouncementsQuery,
  AllAnnouncementsSlugsQuery,
  AnnouncementQuery,
  MenuItemsQuery,
  AllPagesSlugsQuery,
  PageQuery,
} from "../generated/graphql";

const API_URL = process.env.GRAPHQL_API_URL;

export async function fetchAPI(
  query,
  { variables }: { variables?: unknown } = {}
) {
  const headers = { "Content-Type": "application/json" };

  const res = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (json.errors) {
    console.log(json.errors);
    console.log("error details", query, variables);
    throw new Error("Failed to fetch API");
  }
  return json.data;
}

type GeneralQueryArgs = {
  first?: number;
  last?: number;
  before?: string;
  after?: string;
  where?: object;
};

export async function getExcavations({
  first = 200,
  last,
  after,
  before,
  where = {},
}: GeneralQueryArgs = {}) {
  const data: ExcavationsQuery = await fetchAPI(
    /* GraphQL */ `
      query Excavations(
        $first: Int
        $last: Int
        $after: String
        $before: String
        $where: RootQueryToExcavationConnectionWhereArgs
      ) {
        excavations(
          first: $first
          last: $last
          after: $after
          before: $before
          where: $where
        ) {
          nodes {
            slug
            title
            id
            featuredImage {
              node {
                altText
                srcSet
                sourceUrl
                sizes
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        first,
        last,
        after,
        before,
        where,
      },
    }
  );

  return data?.excavations;
}

export async function getAllExcavationsWithSlug() {
  const data: AllExcavationsSlugsQuery = await fetchAPI(/* GraphQL */ `
    query AllExcavationsSlugs {
      excavations(first: 100) {
        nodes {
          slug
        }
      }
    }
  `);
  return data?.excavations;
}

export async function getExcavation(slug) {
  const data: ExcavationQuery = await fetchAPI(
    /* GraphQL */ `
      query Excavation($id: ID!) {
        excavation(id: $id, idType: SLUG) {
          content
          date
          slug
          title
          featuredImage {
            node {
              altText
              srcSet
              sourceUrl
              sizes
              caption(format: RENDERED)
              author {
                node {
                  name
                }
              }
            }
          }
          author {
            node {
              name
              slug
            }
          }
          tags {
            nodes {
              slug
              name
            }
          }
        }
      }
    `,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data?.excavation;
}

export async function getAnnouncements({
  first = 200,
  last,
  after,
  before,
  where = {},
}: GeneralQueryArgs = {}) {
  const data: AnnouncementsQuery = await fetchAPI(
    /* GraphQL */ `
      query Announcements(
        $first: Int
        $last: Int
        $after: String
        $before: String
        $where: RootQueryToAnnouncementConnectionWhereArgs
      ) {
        announcements(
          first: $first
          last: $last
          after: $after
          before: $before
          where: $where
        ) {
          nodes {
            slug
            title
            id
            featuredImage {
              node {
                altText
                srcSet
                sourceUrl
                sizes
              }
            }
          }
        }
      }
    `,
    {
      variables: {
        first,
        last,
        after,
        before,
        where,
      },
    }
  );

  return data?.announcements;
}

export async function getAllAnnouncementsWithSlug() {
  const data: AllAnnouncementsSlugsQuery = await fetchAPI(/* GraphQL */ `
    query AllAnnouncementsSlugs {
      announcements(first: 100) {
        nodes {
          slug
        }
      }
    }
  `);
  return data?.announcements;
}

export async function getAnnouncement(slug) {
  const data: AnnouncementQuery = await fetchAPI(
    /* GraphQL */ `
      query Announcement($id: ID!) {
        announcement(id: $id, idType: SLUG) {
          content
          date
          slug
          title
          featuredImage {
            node {
              altText
              srcSet
              sourceUrl
              sizes
            }
          }
          author {
            node {
              name
              slug
            }
          }
        }
      }
    `,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data?.announcement;
}

export async function getMenuItems(menu) {
  const data: MenuItemsQuery = await fetchAPI(
    /* GraphQL */ `
      query MenuItems($id: ID!) {
        menu(id: $id, idType: NAME) {
          id
          menuItems {
            nodes {
              path
              order
              id
              label
            }
          }
        }
      }
    `,
    {
      variables: {
        id: menu,
      },
    }
  );

  return data?.menu?.menuItems;
}

export async function getAllPagesWithSlug() {
  const data: AllPagesSlugsQuery = await fetchAPI(/* GraphQL */ `
    query AllPagesSlugs {
      pages(first: 100) {
        nodes {
          slug
        }
      }
    }
  `);
  return data?.pages;
}

export async function getPage(slug) {
  const data: PageQuery = await fetchAPI(
    /* GraphQL */ `
      query Page($id: ID!) {
        page(id: $id, idType: URI) {
          content
          date
          slug
          title
          featuredImage {
            node {
              altText
              srcSet
              sourceUrl
              sizes
            }
          }
        }
      }
    `,
    {
      variables: {
        id: slug,
      },
    }
  );
  return data?.page;
}

export async function getContentTypes() {
  const data = await fetchAPI(/* GraphQL */ `
    query getContentTypes {
      contentTypes {
        nodes {
          label
          name
        }
      }
    }
  `);
  return data?.contentTypes;
}
