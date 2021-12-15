import type { ReactNode } from "react";

type BreadcrumbsWrapperProps = {
  children?: ReactNode;
};
// Min height is set to prevent layout jumps after breadcrumbs loads on client
export default function BreadcrumbsWrapper({
  children,
}: BreadcrumbsWrapperProps) {
  return (
    <div tw="border-t border-b border-gray-300 height[2.75rem]">
      <div tw="mx-auto px-6 max-width[60em] h-full">{children}</div>
    </div>
  );
}
