import Head from "next/head";

import useBreadcrumbs from "@hooks/use-breadcrumbs";

import SiteLayout from "@components/site-layout";
import ContentWrapper from "@components/content-wrapper";
import BreadcrumbsWrapper from "@components/breadcrumbs-wrapper";
import Breadcrumbs from "@components/breadcrumbs";

// data
import { getPage } from "@lib/api";

// types
import type { InferGetStaticPropsType } from "next";

export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const breadcrumbs = useBreadcrumbs();

  const { title } = page || {};

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
        <h2>Sekretariát</h2>
        <p>
          <strong>Bc. Kamila Wegnerová</strong>
          <br />
          <span>
            <a href="mailto:office@labrys.cz">office@labrys.cz</a>
          </span>
          <br />
          <span>
            <a href="mailto:office@labrys.cz">labrys.ops@seznam.cz</a>
          </span>
          <br />
          <span>(+420) 777 666 543</span>
          <br />
          fax: +(420) 235 311 337
        </p>
        <h2>Ředitel</h2>
        <p>
          <strong>Mgr. Miloš Pekařík</strong>
          <br />
          <span>
            <a href="mailto:office@labrys.cz">pekarik@labrys.cz</a>
          </span>
          <br />
          <span>(+420) 731 543 210</span>
        </p>
      </ContentWrapper>
    </div>
  );
}

Page.Layout = SiteLayout;

export const getStaticProps = async () => {
  const page = await getPage("kontakt");

  return {
    props: {
      page,
    },
  };
};
