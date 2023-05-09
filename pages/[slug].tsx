import Head from "next/head";

import useBreadcrumbs from "@hooks/use-breadcrumbs";

import SiteLayout from "@components/site-layout";
import ContentWrapper from "@components/content-wrapper";
import BreadcrumbsWrapper from "@components/breadcrumbs-wrapper";
import Breadcrumbs from "@components/breadcrumbs";

// data
import { getPage, getAllPagesWithSlug } from "@lib/api";

// types
import type { InferGetStaticPropsType, GetStaticPropsContext } from "next";

export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const breadcrumbs = useBreadcrumbs();

  const { content, title } = page || {};

  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BreadcrumbsWrapper>
        <Breadcrumbs
          nodes={breadcrumbs}
          currentTitle={title ?? "Missing title"}
        />
      </BreadcrumbsWrapper>
      <ContentWrapper>
        <h1 tw="text-5xl">{title}</h1>
        <section dangerouslySetInnerHTML={{ __html: content ?? "" }} />
      </ContentWrapper>
    </div>
  );
}

Page.Layout = SiteLayout;

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const slug = String(context.params?.slug);
  const page = await getPage(slug);
  return {
    props: {
      page,
    },
  };
};

export const getStaticPaths = async () => {
  const pages = await getAllPagesWithSlug();

  return {
    paths:
      pages?.nodes
        /* Dirty fix! TODO use fs or sth similar to filter out non-dynamic pages */
        ?.filter(
          (node) => !["pro-stavebniky", "kontakt"].includes(String(node?.slug))
        )
        .map((node) => `/${node?.slug}`) || [],
    fallback: false,
  };
};
