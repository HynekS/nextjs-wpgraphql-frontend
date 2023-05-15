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
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";

const pattern = new RegExp(String(process.env.ASSETS_PATH_PATTERN), "gi");
const replacement = String(process.env.ASSETS_PATH_REPLACEMENT);

export default function Announcement({
  announcement,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const breadcrumbs = useBreadcrumbs();
  let { content, title, date } = announcement || {};

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BreadcrumbsWrapper>
        <Breadcrumbs
          nodes={breadcrumbs}
          currentTitle={title || "Missing Title"}
        />
      </BreadcrumbsWrapper>
      <ContentWrapper>
        <div tw="md:(max-width[76ch])">
          <h1 tw="leading-none">{title}</h1>
          <footer>
            <div tw="mt-2 color[#868e96] text-xs leading-loose font-bold">
              {date ? new Date(date).toLocaleDateString() : ""}
            </div>
          </footer>
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
              __html: content ? content.replace(pattern, replacement) : "",
            }}
          />
        </div>
      </ContentWrapper>
    </div>
  );
}

Announcement.Layout = SiteLayout;

export async function getStaticProps(
  context: GetStaticPropsContext<{ slug: string }>
) {
  const slug = String(context.params?.slug);
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
      allAnnouncements?.nodes?.map((node) => `/aktuality/${node?.slug}`) || [],
    fallback: false,
  };
}
