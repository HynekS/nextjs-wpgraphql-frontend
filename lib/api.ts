import type {
  ExcavationsQueryVariables,
  ExcavationsQuery,
  AllExcavationsSlugsQueryVariables,
  AllExcavationsSlugsQuery,
  ExcavationQueryVariables,
  ExcavationQuery,
  AnnouncementsQueryVariables,
  AnnouncementsQuery,
  AllAnnouncementsSlugsQueryVariables,
  AllAnnouncementsSlugsQuery,
  AnnouncementQueryVariables,
  AnnouncementQuery,
  MenuItemsQueryVariables,
  MenuItemsQuery,
  AllPagesSlugsQueryVariables,
  AllPagesSlugsQuery,
  PageQueryVariables,
  PageQuery,
  GetContentTypesQueryVariables,
  GetContentTypesQuery,
} from "../generated/graphql";

type Query =
  | ExcavationsQuery
  | AllExcavationsSlugsQuery
  | ExcavationQuery
  | AnnouncementsQuery
  | AllAnnouncementsSlugsQuery
  | AnnouncementQuery
  | MenuItemsQuery
  | AllPagesSlugsQuery
  | PageQuery
  | GetContentTypesQuery;

type Options = {
  variables?:
    | ExcavationsQueryVariables
    | AllExcavationsSlugsQueryVariables
    | ExcavationQueryVariables
    | AnnouncementsQueryVariables
    | AllAnnouncementsSlugsQueryVariables
    | AnnouncementQueryVariables
    | AllPagesSlugsQueryVariables
    | MenuItemsQueryVariables
    | PageQueryVariables
    | GetContentTypesQueryVariables;
};

const API_URL = String(process.env.GRAPHQL_API_URL);

export async function fetchAPI<T extends Query>(
  query: string,
  { variables }: Options = {}
): Promise<T> {
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

export async function getExcavations({
  first = 200,
  last,
  after,
  before,
  where = {},
}: ExcavationsQueryVariables = {}) {
  const data = await fetchAPI<ExcavationsQuery>(
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
  const data = await fetchAPI<AllExcavationsSlugsQuery>(/* GraphQL */ `
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

export async function getExcavation(slug: ExcavationQueryVariables["id"]) {
  const data = await fetchAPI<ExcavationQuery>(
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
}: AnnouncementsQueryVariables = {}) {
  const data = await fetchAPI<AnnouncementsQuery>(
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
  const data = await fetchAPI<AllAnnouncementsSlugsQuery>(/* GraphQL */ `
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

export async function getAnnouncement(slug: AnnouncementQueryVariables["id"]) {
  const data = await fetchAPI<AnnouncementQuery>(
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

export async function getMenuItems(menu: MenuItemsQueryVariables["id"]) {
  const data = await fetchAPI<MenuItemsQuery>(
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
  const data = await fetchAPI<AllPagesSlugsQuery>(/* GraphQL */ `
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

export async function getPage(slug: PageQueryVariables["id"]) {
  const data = await fetchAPI<PageQuery>(
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
  const data = await fetchAPI<GetContentTypesQuery>(/* GraphQL */ `
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
