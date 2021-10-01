import Header from "@components/header";
import NavPrimary from "@components/nav-primary";
import Contacts from "@components/contacts";
import Footer from "@components/footer";

import { navItems } from "../global-manifest.json";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header>
        <div tw="flex flex-col justify-center md:(justify-between)">
          <Contacts />
          <NavPrimary navItems={navItems}></NavPrimary>
        </div>
      </Header>
      <div tw="flex-1 background[url('/assets/images/triangles.svg') repeat-x left 0 top calc(100% + 12px)]">
        {children}
      </div>
      <Footer />
    </>
  );
}
