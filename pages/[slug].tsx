import Head from "next/head";

import useBreadcrumbs from "@hooks/use-breadcrumbs";

import SiteLayout from "@components/site-layout";
import ContentWrapper from "@components/content-wrapper";
import BreadcrumbsWrapper from "@components/breadcrumbs-wrapper";
import Breadcrumbs from "@components/breadcrumbs";

// data
import { getPage, getAllPagesWithSlug } from "@lib/api";

// types
import type { Unwrap } from "@lib/type-utils";

type PageProps = {
  page: Unwrap<typeof getPage>;
};

export default function Page({ page: { content, title } }: PageProps) {
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
        <h1>{title}</h1>
        <section dangerouslySetInnerHTML={{ __html: content }} />
      </ContentWrapper>
    </div>
  );
}

Page.Layout = SiteLayout;

export async function getStaticProps(context) {
  const { slug } = context.params;
  const page = await getPage(slug);
  return {
    props: {
      page,
    },
  };
}

export async function getStaticPaths() {
  const pages = await getAllPagesWithSlug();
  return {
    paths: pages.nodes.map((node) => `/${node.slug}`) || [],
    fallback: false,
  };
}
