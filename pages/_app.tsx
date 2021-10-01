import { Fragment, ReactNode } from "react";
import { NextPage } from "next";
import { Global } from "@emotion/react";
import { GlobalStyles } from "twin.macro";

import SiteLayout from "../components/site-layout";
import oc from "@lib/ocGetter";

type PageWithLayoutType = NextPage & { Layout: typeof SiteLayout };
type AppLayoutProps = {
  Component: PageWithLayoutType;
  pageProps: any;
};

function MyApp({ Component, pageProps }: AppLayoutProps) {
  const Layout = Component.Layout || Fragment;

  return (
    <>
      <GlobalStyles />
      <Global
        styles={`
        :root {
          --brand-color-red : #C84819;
          --brand-color-yellow : #F3B01C;
          --default-text-color : ${oc`$oc-gray-8`};
          --base-font-family: "skolar-sans-latin";
          --base-font-size: 16px;
          --base-line-height: 1.5;
        }

        h1, h2, h3, h4, h5, h6 {
          font-size: revert;
          font-weight: revert;
          line-height: revert;
          margin-block-start: revert;
          margin-block-end: revert;
        }

        html {
          overflow-y: overlay;
        }
        
        body {
          font-family: var(--base-font-family), "Source sans pro", "Helvetica Neue", Helvetica, Arial, sans-serif;
          font-size: 1em;
          font-variant-numeric: oldstyle-nums;
          font-feature-settings: "onum";
          color: var(--default-text-color);
          
        }

        #__next {
          height: 100%;
          display: flex;
          min-height: 100vh;
          flex-direction: column;
        }
        
        p {
          font-size: 1em; 
          line-height: 1.5;
          margin-bottom: 1.5;
          margin-top: 0;
        }
        
        a, a:visited, a:hover, a:active {
          cursor: pointer;
          color: ${oc`$oc-cyan-7`}
        }
        
        button {
          cursor: pointer;
        }
        
        html::selection {
          background-color: #C84819;
          color: ${oc`$oc-gray-1`};
        }`}
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
