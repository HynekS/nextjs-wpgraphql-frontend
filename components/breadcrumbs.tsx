import Link from "next/link";

import { contentTypesTuples } from "global-manifest.json";

import type { Breadcrumb } from "../hooks/use-breadcrumbs";

const contentTypesTuplesMap: Map<string, string> = new Map(
  contentTypesTuples as [string, string][]
);

const removeQueryString = (str: string) => str.split("?")[0];

type BreadcrumbProps = {
  nodes: Breadcrumb[] | null;
  currentTitle?: string;
};

export default function Breadcrumbs({
  nodes,
  currentTitle = "",
}: BreadcrumbProps) {
  return nodes ? (
    <ol tw="flex h-full overflow-hidden text-xs">
      {nodes.map(({ href, label }, i, { length }) => (
        <li tw="flex items-center" key={href}>
          {
            // Tracking if element is the last one
            i < length - 1 ? (
              <>
                <Link href={href}>
                  <a tw="hover:(border-b border-current)">
                    {contentTypesTuplesMap.get(removeQueryString(href)) ||
                      label}
                  </a>
                </Link>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                </svg>
              </>
            ) : (
              // Last item of the list is not a link (it would make little sense)
              <span tw="truncate">
                {currentTitle ||
                  contentTypesTuplesMap.get(removeQueryString(href)) ||
                  label}
              </span>
            )
          }
        </li>
      ))}
    </ol>
  ) : null;
}
