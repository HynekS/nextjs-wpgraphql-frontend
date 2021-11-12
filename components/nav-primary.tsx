import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import tw, { css } from "twin.macro";

import Contacts from "@components/contacts";
import Logo from "@components/logo";

type NavItems = {
  nodes: {
    path: string;
    order: number;
    id: string;
    label: string;
  }[];
};

type NavPrimaryProps = {
  navItems: NavItems;
};

// TODO: extract, clean up
const usePushContent = (
  headerElementRef: React.RefObject<HTMLDivElement>,
  breakpoint = 768
) =>
  useEffect(() => {
    let resizeObserver: ResizeObserver | null;
    if (headerElementRef.current) {
      resizeObserver = new ResizeObserver(() => {
        let transformed = false;
        if (window.innerWidth < breakpoint && !transformed) {
          document.body.style.paddingTop = `${
            headerElementRef.current!.clientHeight
          }px`;
          transformed = true;
        } else {
          document.body.style.removeProperty("padding-top");
          transformed = false;
        }
      });
      resizeObserver.observe(document.body);
    }
    return () => {
      resizeObserver = null;
    };
  }, []);

export default function NavPrimary({ navItems }: NavPrimaryProps) {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const { asPath } = useRouter();
  const { nodes = [] } = navItems;

  let headerElement = useRef<HTMLDivElement>(null);

  const closeOnEsc = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsNavMenuOpen(false);
    }
  };

  usePushContent(headerElement);

  // Listen to Esc key
  useEffect(() => {
    document.addEventListener("keyup", closeOnEsc);
    return () => {
      document.removeEventListener("keyup", closeOnEsc);
    };
  }, []);

  // Disable scrolling when menu is opened
  useEffect(() => {
    if (isNavMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.documentElement.style.removeProperty("overflow");
      document.body.style.removeProperty("overflow");
    };
  }, [isNavMenuOpen]);

  // Close menu when navigated
  useEffect(() => {
    if (isNavMenuOpen) {
      setIsNavMenuOpen(false);
    }
    return () => {};
  }, [asPath]);

  const getRoot = (pathString: string): string | undefined =>
    pathString.match(/^\/[^\/\?]+/)?.[0];

  const menu = (items: NavItems["nodes"]) => (
    <nav tw="h-full md:(flex h-auto justify-end)">
      <ul
        css={[
          tw`pointer-events-auto h-full transition[transform 0.5s ease-in-out] bg-white md:(flex py-4 static w-auto h-auto)`,
          isNavMenuOpen
            ? tw`md:(transform[translateX(0)])`
            : tw`(transform[translateX(-100%)]) md:(transform[translateX(0)])`,
        ]}
      >
        {items.map((item) => (
          <li key={item.id}>
            <Link href={item.path}>
              <a
                css={[
                  tw`pb-0.5 color[var(--default-text-color)] whitespace-nowrap ml-4 uppercase transition[border-color .3s ease-in-out] hover:(color[var(--default-text-color)] border-b-2 border-bottom-color[var(--brand-color-red)])`,
                  // active nav item has a different color
                  getRoot(asPath) === item.path &&
                    tw`border-b-2 border-bottom-color[var(--brand-color-yellow)]`,
                ]}
              >
                {item.label}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  const toggleButton = () => (
    <nav
      tw="md:(hidden) p-2"
      aria-labelledby="primary-navigation"
      // TODO simplify using selector nesting etc.
      css={css`
        .hamburger {
          display: inline-block;
          cursor: pointer;
          transition-property: opacity, filter;
          transition-duration: 0.15s;
          transition-timing-function: linear;
          text-transform: none;
          border: 0;
          margin: 0;
          margin-top: -2px;
          padding: 0.5rem;
          overflow: visible;

          &:focus {
            outline: var(--brand-color-yellow) auto 3px;
          }

          &:hover {
            opacity: 0.7;
          }

          &.is-active:hover {
            opacity: 0.7;
          }
          &.is-active .hamburger-inner,
          &.hamburger.is-active .hamburger-inner::before,
          &.hamburger.is-active .hamburger-inner::after {
            background-color: #000;
          }
        }

        .hamburger-box {
          width: 40px;
          height: 24px;
          display: inline-block;
          position: relative;
        }

        .hamburger-inner {
          display: block;
          top: 50%;
        }
        .hamburger-inner,
        .hamburger-inner::before,
        .hamburger-inner::after {
          width: 40px;
          height: 3px;
          background-color: #000;
          border-radius: 4px;
          position: absolute;
          transition-property: transform;
          transition-duration: 0.15s;
          transition-timing-function: ease;
        }

        .hamburger-inner::before,
        .hamburger-inner::after {
          content: "";
          display: block;
        }

        .hamburger-inner::before {
          top: -10px;
        }

        .hamburger-inner::after {
          bottom: -10px;
        }

        .hamburger--squeeze {
          & .hamburger-inner {
            transition-duration: 0.075s;
            transition-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          }

          & .hamburger-inner::before {
            transition: top 0.075s 0.12s ease, opacity 0.075s ease;
          }

          & .hamburger-inner::after {
            transition: bottom 0.075s 0.12s ease,
              transform 0.075s cubic-bezier(0.55, 0.055, 0.675, 0.19);
          }

          &.is-active .hamburger-inner {
            transform: rotate(45deg);
            transition-delay: 0.12s;
            transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }

          &.is-active .hamburger-inner::before {
            top: 0;
            opacity: 0;
            transition: top 0.075s ease, opacity 0.075s 0.12s ease;
          }

          &.is-active .hamburger-inner::after {
            bottom: 0;
            transform: rotate(-90deg);
            transition: bottom 0.075s ease,
              transform 0.075s 0.12s cubic-bezier(0.215, 0.61, 0.355, 1);
          }
        }
      `}
    >
      <button
        // sorry for the !, I just dont't have morals to do it in a cleaner way (& I don't want to set it via the hamburger css snippet)
        id="primary-navigation"
        aria-label={`${
          isNavMenuOpen ? `Hide navigation menu` : `Show navigation menu`
        }`}
        aria-expanded={isNavMenuOpen}
        onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
        className={`hamburger hamburger--squeeze ${
          isNavMenuOpen ? `is-active` : ""
        }`}
      >
        <div className="hamburger-box">
          <div className="hamburger-inner"></div>
        </div>
      </button>
    </nav>
  );

  return (
    <>
      <div
        ref={headerElement}
        tw="flex pt-3 items-center bg-white pointer-events-auto background-image[url('/assets/images/triangles.svg')] background-position[0 -12px] bg-repeat-x md:(bg-none pt-0)"
      >
        <Logo />
        {toggleButton()}
      </div>
      <div tw="flex flex-col flex-1 md:(justify-between)">
        <Contacts />
        {menu(nodes)}
      </div>
    </>
  );
}
