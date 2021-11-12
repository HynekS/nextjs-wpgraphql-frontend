import Head from "next/head";
import { useRouter } from "next/router";

import useBreadcrumbs from "@hooks/use-breadcrumbs";

import SiteLayout from "@components/site-layout";
import ContentWrapper from "@components/content-wrapper";
import BreadcrumbsWrapper from "@components/breadcrumbs-wrapper";
import Breadcrumbs from "@components/breadcrumbs";
import Card from "@components/card";

// data
import { getExcavations } from "@lib/api";

//types
import type { InferGetStaticPropsType } from "next";

const POSTS_PER_PAGE = 9;

const ExcavationsPage = ({
  allExcavations,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const breadcrumbs = useBreadcrumbs();

  const { nodes } = allExcavations || {};

  const {
    query: { page = 0 },
  } = useRouter();

  const currentPageSlice =
    nodes?.slice(
      +page * POSTS_PER_PAGE,
      +page * POSTS_PER_PAGE + POSTS_PER_PAGE
    ) || [];

  const isNextPageSlice =
    Boolean(
      nodes?.slice(
        (+page + 1) * POSTS_PER_PAGE,
        (+page + 1) * POSTS_PER_PAGE + POSTS_PER_PAGE
      ).length
    ) || [];

  return (
    <>
      <Head>
        <title>Přehled výzkumů společnosti Labrys, o. p. s.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BreadcrumbsWrapper>
        <Breadcrumbs nodes={breadcrumbs} />
      </BreadcrumbsWrapper>
      <ContentWrapper>
        <h1>Výzkumy</h1>
        <button
          disabled={page < 1}
          onClick={() => {
            router.push(
              +page === 1 ? `/vyzkumy` : `/vyzkumy?page=${+page - 1}`
            );
          }}
        >
          Previous
        </button>
        <button
          disabled={!isNextPageSlice}
          onClick={() => {
            router.push(`/vyzkumy?page=${+page + 1}`);
          }}
        >
          Next
        </button>

        <section tw="flex flex-row flex-wrap justify-between">
          {currentPageSlice.length
            ? currentPageSlice.map((node) => (
                <Card baseUrl="vyzkumy" node={node} key={node?.id} />
              ))
            : null}
        </section>
      </ContentWrapper>
    </>
  );
};

ExcavationsPage.Layout = SiteLayout;

export const getStaticProps = async () => {
  const allExcavations = await getExcavations();

  return {
    props: {
      allExcavations,
    },
  };
};

export default ExcavationsPage;
