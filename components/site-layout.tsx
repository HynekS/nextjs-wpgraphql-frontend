import Header from "@components/header";
import NavPrimary from "@components/nav-primary";
import Contacts from "@components/contacts";
import Footer from "@components/footer";
import Logo from "@components/logo";

import { navItems } from "../global-manifest.json";

export default function SiteLayout({ children }) {
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
