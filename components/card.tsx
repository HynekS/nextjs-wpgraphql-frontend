import Link from "next/link";

import { AnnouncementsQuery, ExcavationsQuery } from "generated/graphql";

type AnnouncementNode = NonNullable<
  NonNullable<AnnouncementsQuery["announcements"]>["nodes"]
>[number];

type ExcavationNode = NonNullable<
  NonNullable<ExcavationsQuery["excavations"]>["nodes"]
>[number];

const pattern = new RegExp(String(process.env.ASSETS_PATH_PATTERN), "gi");
const replacement = String(process.env.ASSETS_PATH_REPLACEMENT);

type CardProps = {
  baseUrl: string;
  node: AnnouncementNode | ExcavationNode;
};

export default function Card({ baseUrl, node }: CardProps) {
  return node ? (
    <div key={node.id} tw="mb-8 w-full md:(width[31%])">
      <div tw="border-bottom[5px solid var(--brand-color-yellow)] relative overflow-hidden">
        <Link href={`/${baseUrl}/${node.slug}`}>
          <a tw="flex max-h-52 h-52">
            <img
              tw="object-cover w-full h-auto  overflow-hidden transition-transform duration-700 hover:(transform[scale(1.1)])"
              srcSet={
                // Some srcSets are missing, even after regenerating thumbnails :/
                (node.featuredImage?.node?.srcSet &&
                  String(node.featuredImage.node.srcSet).replace(
                    pattern,
                    replacement
                  )) ??
                undefined
              }
              sizes={node.featuredImage?.node?.sizes ?? undefined}
              src={String(node.featuredImage?.node?.sourceUrl).replace(
                pattern,
                replacement
              )}
              alt={node.featuredImage?.node?.altText ?? ""}
            ></img>
          </a>
        </Link>
      </div>
      <Link href={`/${baseUrl}/${node.slug}`}>
        <a>
          <h2 tw="mt-1 mb-4 text-xl">{node.title}</h2>
        </a>
      </Link>
    </div>
  ) : null;
}
