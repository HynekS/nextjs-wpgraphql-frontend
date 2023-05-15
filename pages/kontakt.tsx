import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { css } from "@emotion/react";

import useBreadcrumbs from "@hooks/use-breadcrumbs";

import SiteLayout from "@components/site-layout";
import ContentWrapper from "@components/content-wrapper";
import BreadcrumbsWrapper from "@components/breadcrumbs-wrapper";
import Breadcrumbs from "@components/breadcrumbs";

// data
import { getPage } from "@lib/api";

// types
import type { InferGetStaticPropsType } from "next";

declare global {
  interface Window {
    SMap: any;
    JAK: any;
    Loader: any;
  }
}

function createMap() {
  const center = window.SMap.Coords.fromWGS84(14.5343894, 50.1046481);
  const m = new window.SMap(window.JAK.gel("m"), center, 16);
  m.addDefaultLayer(window.SMap.DEF_BASE).enable();
  m.addDefaultControls();

  const layer = new window.SMap.Layer.Marker();
  m.addLayer(layer);
  layer.enable();
  const marker = new window.SMap.Marker(center, "myMarker", {});
  layer.addMarker(marker);
}

export default function Page({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const breadcrumbs = useBreadcrumbs();

  const { title } = page || {};

  useEffect(() => {
    if (window.SMap) {
      createMap();
    }
  }, []);

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
        <div tw="flex flex-col justify-between md:flex-row">
          <div>
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
          </div>
          <div
            css={css`
              & img {
                max-width: initial;
              }
            `}
            tw="w-full pr-4 mt-10 md:w-2/3 h-80"
          >
            <div id="m" tw="w-full h-full rounded-md"></div>
          </div>
        </div>
      </ContentWrapper>
      <Script
        id="mapy-cz"
        strategy="lazyOnload"
        src="https://api.mapy.cz/loader.js"
        onLoad={() => {
          window.Loader.async = true;
          window.Loader.load(null, null, createMap);
        }}
      />
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
