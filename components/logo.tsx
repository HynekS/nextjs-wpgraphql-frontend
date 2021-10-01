import Link from "next/link";

export default function Logo() {
  return (
    <div tw="p-2 pb-4 md:(p-4)">
      <Link href="/">
        <a>
          <img
            tw="w-2/5 h-auto sm:(w-4/12) md:(width[175px] min-width[175px])"
            src="/assets/images/logo-color.svg"
            alt="logo"
            height="67px"
            width="175px"
          />
        </a>
      </Link>
    </div>
  );
}
