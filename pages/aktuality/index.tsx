import Head from "next/head";

import useBreadcrumbs from "@hooks/use-breadcrumbs";

import SiteLayout from "@components/site-layout";
import ContentWrapper from "@components/content-wrapper";
import BreadcrumbsWrapper from "@components/breadcrumbs-wrapper";
import Breadcrumbs from "@components/breadcrumbs";
import Card from "@components/card";

// data
import { getAnnouncements } from "@lib/api";

//types
import type { InferGetStaticPropsType } from "next";

export default function Announcement({
  allAnnouncements,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const breadcrumbs = useBreadcrumbs();
  const { nodes } = allAnnouncements || {};

  return (
    <div>
      <Head>
        <title>Přehled aktualit společnosti Labrys, o. p. s.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BreadcrumbsWrapper>
        <Breadcrumbs nodes={breadcrumbs} />
      </BreadcrumbsWrapper>
      <ContentWrapper>
        <h1>Aktuality</h1>
        <section tw="flex flex-row flex-wrap justify-between">
          {nodes
            ? nodes.map((node) => (
                <Card baseUrl="aktuality" node={node} key={node?.id} />
              ))
            : null}
        </section>
      </ContentWrapper>
    </div>
  );
}

Announcement.Layout = SiteLayout;

export const getStaticProps = async () => {
  const allAnnouncements = await getAnnouncements();
  return {
    props: {
      allAnnouncements,
    },
  };
};
