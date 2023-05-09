import Head from "next/head";

import useBreadcrumbs from "@hooks/use-breadcrumbs";

import SiteLayout from "@components/site-layout";
import ContentWrapper from "@components/content-wrapper";
import BreadcrumbsWrapper from "@components/breadcrumbs-wrapper";
import Breadcrumbs from "@components/breadcrumbs";

// data
import { getPage } from "@lib/api";

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
        <div tw="mt-4 pr-4 lg:mt-8 lg:pr-20 border-t">
          <h2 tw="mb-4 text-4xl">Kontaktujte nás</h2>
          <p tw="mb-8">
            Máte dotaz na průběh, časovou či finanční náročnost archeologického
            výzkumu či dohledu, případně stávající legislativy? Odpovíme Vám!
          </p>
          <form action="#" tw="space-y-8">
            <div>
              <label
                htmlFor="email"
                tw="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Váš e-mail:
              </label>
              <input
                type="email"
                id="email"
                tw="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:border block w-full p-2.5"
                placeholder="jan-novak@seznam.cz"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                tw="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Předmět:
              </label>
              <input
                type="text"
                id="subject"
                tw="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-1 focus:border"
                placeholder="S čím Vám můžeme pomoci"
                required
              />
            </div>
            <div tw="sm:col-span-2">
              <label
                htmlFor="message"
                tw="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Zpráva:
              </label>
              <textarea
                id="message"
                rows={6}
                tw="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-1 focus:border"
                placeholder="Potřeboval bych vědět..."
              ></textarea>
            </div>
            <button
              type="submit"
              tw="py-3 px-5 font-medium text-center text-white rounded-lg w-full md:w-auto transition-colors bg-[var(--brand-color-red)] hover:bg-[#b33c10] focus:ring-4 focus:outline-none focus:ring-gray-300"
            >
              Poslat zprávu
            </button>
          </form>
        </div>
      </ContentWrapper>
    </div>
  );
}

Page.Layout = SiteLayout;

export const getStaticProps = async (
  context: GetStaticPropsContext<{ slug: string }>
) => {
  const slug = String(context.params?.slug);

  const page = await getPage("pro-stavebniky");

  return {
    props: {
      page,
    },
  };
};
