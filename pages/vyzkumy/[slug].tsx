import Head from "next/head";

import useBreadcrumbs from "@hooks/use-breadcrumbs";

import SiteLayout from "@components/site-layout";
import ContentWrapper from "@components/content-wrapper";
import BreadcrumbsWrapper from "@components/breadcrumbs-wrapper";
import Breadcrumbs from "@components/breadcrumbs";

// queries
import { getExcavation, getAllExcavationsWithSlug } from "@lib/api";

// types
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";

const replacer = new RegExp(String(process.env.ASSETS_PATH_REPLACER), "gi");
const target = String(process.env.ASSETS_PATH_TO_REPLACE);

export default function Excavation({
  Excavation,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    content = "",
    title = "Missing Title",
    date,
    featuredImage = {},
    author = {},
    tags,
  } = Excavation || {};

  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BreadcrumbsWrapper>
        <Breadcrumbs nodes={breadcrumbs} currentTitle={String(title)} />
      </BreadcrumbsWrapper>
      <ContentWrapper>
        <article>
          {featuredImage ? (
            <figure tw="mb-8 overflow-hidden">
              <img
                tw="max-height[calc(60 * 0.67 * 1em)] w-full object-cover"
                alt={featuredImage.node?.altText ?? ""}
                srcSet={featuredImage.node?.srcSet?.replace(replacer, target)}
                // Wordpress is serving some weird sizes, this is a temporary fix
                sizes={featuredImage.node?.sizes
                  ?.split(",")
                  .map((size, i, { length }) =>
                    i === length - 1 ? "60em" : size
                  )
                  .join(",")}
                src={featuredImage.node?.sourceUrl?.replace(replacer, target)}
              />

              {featuredImage.node?.caption && (
                <figcaption
                  tw="text-center p-2 border-b border-dotted border-bottom-color[#868e96]"
                  dangerouslySetInnerHTML={{
                    __html: featuredImage.node.caption,
                  }}
                ></figcaption>
              )}
            </figure>
          ) : null}
          <div tw="flex">
            <div tw="flex[1 1 0] background[url('/assets/images/image-jar.svg') no-repeat] opacity-25"></div>
            <div tw="flex[4 1 0] mx-6">
              <h1 tw="my-3 text-5xl font-medium">{title}</h1>
            </div>
            <div tw="flex[1 1 0]"></div>
          </div>
          <div tw="flex">
            <div
              tw="flex[4 1 0] order-2 mx-6"
              css={`
                figure {
                  margin: 0 0 1.5rem;
                }
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
                .gallery {
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: start;
                }
                .gallery-item {
                  flex: 0 0 33%;
                }
                .gallery-caption {
                  visibility: hidden;
                }
                .gallery-item img {
                  margin: 0 auto;
                }
              `}
              dangerouslySetInnerHTML={{
                __html: content ? content.replace(replacer, target) : "",
              }}
            />

            <footer tw="flex[1 1 0] order-1 text-right">
              <div tw="color[#868e96] text-xs leading-loose font-bold">
                {date ? new Date(date).toLocaleDateString() : ""}
              </div>
              <div tw="font-medium">Autor:</div>
              <div>
                <span tw="color[#1098ad] border-b border-gray-400 hover:(background-color[rgba(16,152,173,.1)])">
                  {author?.node?.name}
                </span>
              </div>
            </footer>
            <footer tw="flex[1 1 0] order-3">
              {tags?.nodes?.length ? (
                <ul>
                  {tags.nodes.map((node) => (
                    <li key={node?.name}>
                      <span tw="background-color[rgba(16,152,173,0.15)] color[#2e7782] pl-1 pr-1.5 py-0.5 text-xs inline-block rounded-sm transition hover:(background-color[rgba(16,152,173,.3)])">
                        {node?.name}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </footer>
          </div>
        </article>
      </ContentWrapper>
    </div>
  );
}

Excavation.Layout = SiteLayout;

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const slug = String(context.params?.slug);
  const Excavation = await getExcavation(slug);
  return {
    props: {
      Excavation,
    },
  };
};

export const getStaticPaths = async () => {
  const allExcavations = await getAllExcavationsWithSlug();
  return {
    paths: allExcavations?.nodes?.map((node) => `/vyzkumy/${node?.slug}`) || [],
    fallback: false,
  };
};
