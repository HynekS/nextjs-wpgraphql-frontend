import Header from "@components/header";
import NavPrimary from "@components/nav-primary";
import Footer from "@components/footer";

import { navItems } from "../global-manifest.json";

type ChildrenProps = {
  children?: React.ReactNode;
};

export default function SiteLayout({ children }: ChildrenProps) {
  return (
    <>
      <Header>
        <NavPrimary navItems={navItems} />
      </Header>
      <div tw="flex-1 background[url('/assets/images/triangles.svg') repeat-x left 0 top calc(100% + 12px)]">
        {children}
      </div>
      <Footer />
    </>
  );
}
