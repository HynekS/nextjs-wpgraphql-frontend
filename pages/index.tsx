import Head from "next/head";
import Link from "next/link";
import tw from "twin.macro";

import SiteLayout from "../components/site-layout";
import ContentWrapper from "@components/content-wrapper";

// data
import { getAnnouncements, getExcavations } from "@lib/api";

// types
import type { InferGetStaticPropsType } from "next";

const pattern = new RegExp(String(process.env.ASSETS_PATH_PATTERN), "gi");
const replacement = String(process.env.ASSETS_PATH_REPLACEMENT);
export default function Home({
  latestExcavations = {},
  latestAnnouncements = {},
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Labrys, o.p.s.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="background[url('/assets/images/bg-dummy.jpg') 50%/50% no-repeat] bg-cover min-height[627px] flex relative z-0 after:(content[''] absolute inset-0 bg-black bg-opacity-30)">
        <ContentWrapper>
          <div tw="relative z-10 mx-auto my-0 text-center">
            <h1 tw="w-full px-4 mt-8 text-center text-gray-200">
              Zajišťujeme archeologické výzkumy a&nbsp;dohledy
            </h1>
            <div
              className="group"
              tw="mx-16 mt-8 focus:(outline-none) inline-block"
            >
              <Link href="/pro-stavebniky">
                <a tw="color[#b2f2bb] hover:(color[#b2f2bb])" tabIndex={0}>
                  <svg
                    width="201.167px"
                    height="99.309px"
                    viewBox="0 0 201.167 99.309"
                    tw="w-full fill-current transition duration-300 filter[drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.9))] group-hocus:(transform[translateY(-5%)])"
                  >
                    <use xlinkHref="/assets/images/image-excavator.svg#excavator" />
                  </svg>

                  <h2 tw="width[180px] height[50px] flex items-center justify-center relative mt-8 text-base color[#b2f2bb] transition duration-300">
                    <svg
                      viewBox="0 0 180 50"
                      tw="absolute fill[none] stroke-width[2] stroke[#b2f2bb]"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="180"
                        height="50"
                        tw="stroke-width[2] fill[#000000]"
                      />
                      <rect
                        x="0"
                        y="0"
                        width="180"
                        height="50"
                        tw="stroke-width[4] stroke-dasharray[150 480] stroke-dashoffset[150] group-hocus:(stroke-dashoffset[-480] transition[all 1s ease-in-out])"
                      />
                    </svg>
                    <span tw="relative my-auto">Chystám se stavět</span>
                  </h2>
                </a>
              </Link>
            </div>
            <div
              className="group"
              tw="mx-16 mt-8 focus:(outline-none) inline-block"
            >
              <Link href="/vyzkumy">
                <a tw="color[#b2f2bb] hover:(color[#b2f2bb])" tabIndex={0}>
                  <svg
                    width="110.006px"
                    height="96px"
                    viewBox="0 0 110.006 96"
                    tw="w-full fill-current transition duration-300 filter[drop-shadow(2px 2px 10px rgba(0, 0, 0, 0.9))] group-hocus:(transform[translateY(-5%)])"
                  >
                    <use xlinkHref="/assets/images/image-jar.svg#image-jar" />
                  </svg>
                  <h2 tw="width[180px] height[50px] flex items-center justify-center relative mt-8 text-base transition duration-300">
                    <svg
                      viewBox="0 0 180 50"
                      tw="absolute fill[none] stroke-width[2] stroke[#b2f2bb]"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="180"
                        height="50"
                        tw="stroke-width[2] fill[#000000]"
                      />
                      <rect
                        x="0"
                        y="0"
                        width="180"
                        height="50"
                        tw="stroke-width[4] stroke-dasharray[150 480] stroke-dashoffset[150] group-hocus:(stroke-dashoffset[-480] transition[all 1s ease-in-out])"
                      />
                    </svg>
                    <span tw="relative my-auto">Zajímá mě archeologie</span>
                  </h2>
                </a>
              </Link>
            </div>
          </div>
        </ContentWrapper>
      </div>
      <ContentWrapper>
        <div tw="relative p-8 bg-white md:(flex -top-48 min-height[12rem] rounded-t-3xl)">
          <div tw="md:(flex[1 1 66%])">
            <h2 tw="mt-0">Aktuality</h2>
            {latestAnnouncements && latestAnnouncements.nodes
              ? latestAnnouncements.nodes.map((node, i) =>
                  node ? (
                    <div key={node.id} tw="md:(pb-4 flex)">
                      <div
                        css={[
                          tw`overflow-hidden border-bottom[4px solid var(--brand-color-yellow)]`,
                          i ? tw`flex[0 0 6rem]` : tw`flex[0 0 12rem]`,
                        ]}
                      >
                        <Link href={`/aktuality/${node.slug}`}>
                          <a tw="relative flex padding-bottom[66%] h-full">
                            <img
                              tw="absolute object-cover w-full h-full overflow-hidden"
                              srcSet={
                                (node.featuredImage?.node?.srcSet &&
                                  String(
                                    node.featuredImage.node.srcSet.replace(
                                      pattern,
                                      replacement
                                    )
                                  )) ??
                                undefined
                              }
                              sizes={
                                node.featuredImage?.node?.sizes ?? undefined
                              }
                              src={String(
                                node.featuredImage?.node?.sourceUrl?.replace(
                                  pattern,
                                  replacement
                                )
                              )}
                              alt={node.featuredImage?.node?.altText ?? ""}
                            ></img>
                          </a>
                        </Link>
                      </div>
                      <Link href={`/aktuality/${node?.slug}`}>
                        <a tw="md:(w-full ml-4 mr-8 border-b border-gray-300)">
                          <h3 tw="mt-0 text-lg text-gray-600">{node?.title}</h3>
                        </a>
                      </Link>
                    </div>
                  ) : null
                )
              : null}
          </div>
          <div tw="md:(flex[1 1 30%])">
            <h2 tw="mt-0">Výzkumy</h2>
            {latestExcavations && latestExcavations.nodes
              ? latestExcavations.nodes.map((node) =>
                  node ? (
                    <div key={node?.id}>
                      <div tw="border-bottom[5px solid var(--brand-color-yellow)] relative overflow-hidden">
                        <Link href={`/vyzkumy/${node?.slug}`}>
                          <a tw="relative flex padding-bottom[66%]">
                            <img
                              tw="absolute inset-0 object-cover w-full h-auto overflow-hidden"
                              srcSet={
                                (node.featuredImage?.node?.srcSet &&
                                  String(
                                    node.featuredImage?.node?.srcSet?.replace(
                                      pattern,
                                      replacement
                                    )
                                  )) ||
                                undefined
                              }
                              src={String(
                                node.featuredImage?.node?.sourceUrl?.replace(
                                  pattern,
                                  replacement
                                )
                              )}
                              alt={node.featuredImage?.node?.altText ?? ""}
                            ></img>
                          </a>
                        </Link>
                      </div>
                      <Link href={`/vyzkumy/${node?.slug}`}>
                        <a>
                          <h3 tw="mt-0 text-lg text-gray-600">{node?.title}</h3>
                        </a>
                      </Link>
                    </div>
                  ) : null
                )
              : null}
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}

Home.Layout = SiteLayout;

export const getStaticProps = async () => {
  const latestAnnouncements = await getAnnouncements({ first: 7 });
  const latestExcavations = await getExcavations({ first: 3 });

  return {
    props: {
      latestAnnouncements,
      latestExcavations,
    },
  };
};
