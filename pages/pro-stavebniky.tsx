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
        <h1>{title}</h1>
        <section dangerouslySetInnerHTML={{ __html: content ?? "" }} />
        <div tw="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 tw="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
            Contact Us
          </h2>
          <p tw="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form action="#" tw="space-y-8">
            <div>
              <label
                htmlFor="email"
                tw="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                tw="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-1 focus:border block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-1 dark:focus:border dark:shadow-sm"
                placeholder="name@flowbite.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                tw="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                tw="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-1 focus:border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-1 dark:focus:border dark:shadow-sm"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div tw="sm:col-span-2">
              <label
                htmlFor="message"
                tw="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={6}
                tw="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-1 focus:border dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-1 dark:focus:border"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              tw="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-gray-700 sm:w-full hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Send message
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
