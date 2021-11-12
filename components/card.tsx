import Link from "next/link";

import { Maybe, Announcement, Excavation, MediaItem } from "generated/graphql";

type AnnouncementNode = Maybe<
  { __typename?: "Announcement" } & Pick<
    Announcement,
    "slug" | "title" | "id"
  > & {
      featuredImage?: Maybe<
        { __typename?: "NodeWithFeaturedImageToMediaItemConnectionEdge" } & {
          node?: Maybe<
            { __typename?: "MediaItem" } & Pick<
              MediaItem,
              "altText" | "srcSet" | "sourceUrl" | "sizes"
            >
          >;
        }
      >;
    }
>;

type ExcavationNode = Maybe<
  { __typename?: "Excavation" } & Pick<Excavation, "slug" | "title" | "id"> & {
      featuredImage?: Maybe<
        { __typename?: "NodeWithFeaturedImageToMediaItemConnectionEdge" } & {
          node?: Maybe<
            { __typename?: "MediaItem" } & Pick<
              MediaItem,
              "altText" | "srcSet" | "sourceUrl" | "sizes"
            >
          >;
        }
      >;
    }
>;

const replacer = new RegExp(String(process.env.ASSETS_PATH_REPLACER), "gi");
const target = String(process.env.ASSETS_PATH_TO_REPLACE);

type CardProps = {
  baseUrl: string;
  node: AnnouncementNode | ExcavationNode;
};

export default function Card({ baseUrl, node }: CardProps) {
  return node ? (
    <div key={node.id} tw="mb-8 md:(width[31%])">
      <div tw="border-bottom[5px solid var(--brand-color-yellow)] relative overflow-hidden">
        <Link href={`/${baseUrl}/${node.slug}`}>
          <a tw="flex max-h-52 h-52">
            <img
              tw="object-cover w-full h-auto  overflow-hidden transition-transform duration-700 hover:(transform[scale(1.1)])"
              srcSet={
                // Some srcSets are missing, even after regenerating thumbnails :/
                (node.featuredImage?.node?.srcSet &&
                  String(node.featuredImage.node.srcSet).replace(
                    replacer,
                    target
                  )) ??
                undefined
              }
              sizes={node.featuredImage?.node?.sizes ?? undefined}
              src={String(node.featuredImage?.node?.sourceUrl).replace(
                replacer,
                target
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
