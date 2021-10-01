import Head from "next/head";
import { css } from "twin.macro";

import useBreadcrumbs from "@hooks/use-breadcrumbs";

import SiteLayout from "@components/site-layout";
import ContentWrapper from "@components/content-wrapper";
import BreadcrumbsWrapper from "@components/breadcrumbs-wrapper";
import Breadcrumbs from "@components/breadcrumbs";

// data
import { getAnnouncement, getAllAnnouncementsWithSlug } from "@lib/api";

//types
import type { Unwrap } from "@lib/type-utils";

const replacer = new RegExp(process.env.ASSETS_PATH_REPLACER, "gi");
const target = process.env.ASSETS_PATH_TO_REPLACE;

export default function Announcement({
  announcement: { content, title },
}: {
  announcement: Unwrap<typeof getAnnouncement>;
}) {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BreadcrumbsWrapper>
        <Breadcrumbs nodes={breadcrumbs} currentTitle={title} />
      </BreadcrumbsWrapper>
      <ContentWrapper>
        <div tw="md:(max-width[76ch])">
          <h1>{title}</h1>
          <section
            // duplicate declarations, see ../vyzkumy/[slug].tsx
            css={css`
              figcaption {
                border-bottom: 1px dotted #868e96;
                line-height: 1.5;
                padding: 0.5rem;
                text-align: center;
              }
              p,
              .wp-caption {
                margin-bottom: 1.5em;
              }
              .wp-caption > a {
                width: 100%;
                display: block;
              }
              .wp-caption > a img {
                margin: 0 auto;
              }
            `}
            dangerouslySetInnerHTML={{
              __html: content.replace(replacer, target),
            }}
          />
        </div>
      </ContentWrapper>
    </div>
  );
}

Announcement.Layout = SiteLayout;

export async function getStaticProps(context) {
  const { slug } = context.params;
  const announcement = await getAnnouncement(slug);
  return {
    props: {
      announcement,
    },
  };
}

export async function getStaticPaths() {
  const allAnnouncements = await getAllAnnouncementsWithSlug();
  return {
    paths:
      allAnnouncements.nodes.map((node) => `/aktuality/${node.slug}`) || [],
    fallback: false,
  };
}
