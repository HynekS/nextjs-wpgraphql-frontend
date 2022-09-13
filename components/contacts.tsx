import Link from "next/link";

export default function Contacts() {
  return (
    <div tw="hidden md:(flex justify-end pointer-events-auto)">
      <Link href="tel:+420774701825">
        <a tw="flex items-center ml-4 color[var(--default-text-color)] hover:(color[var(--brand-color-red)] border-color[var(--brand-color-red)])">
          <svg
            tw="h-3 fill-current"
            x="0px"
            y="0px"
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
            xmlSpace="preserve"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15,4c0-1-3-3-3-3c-2,0-6.055,2.055-8,4s-4,6-4,8c0,0,2,3,3,3s4-3,3-4s-2-1-2-2s1-2,2-3s2-2,3-2s1,1,2,2S15,5,15,4z" />
          </svg>
          <span tw="border-b hover:(border-color[var(--brand-color-red)])">
            774701825
          </span>
        </a>
      </Link>
      <Link href="mailto:office@labrys.cz">
        <a tw="flex items-center ml-4 color[var(--default-text-color)] hover:(color[var(--brand-color-red)] border-color[var(--brand-color-red)])">
          <svg
            tw="h-3 fill-current"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.333 0h-10.666c-1.467 0-2.667 1.2-2.667 2.667v10.666c0 1.468 1.2 2.667 2.667 2.667h10.666c1.467 0 2.667-1.199 2.667-2.667v-10.666c0-1.467-1.2-2.667-2.667-2.667zM13.333 2c0.125 0 0.243 0.036 0.344 0.099l-5.678 4.694-5.677-4.694c0.101-0.063 0.219-0.099 0.344-0.099h10.666zM2.667 14c-0.030 0-0.060-0.002-0.089-0.006l3.525-4.89-0.457-0.457-3.646 3.646v-9.549l6 7.256 6-7.256v9.549l-3.646-3.646-0.457 0.457 3.525 4.89c-0.029 0.004-0.059 0.006-0.088 0.006h-10.666z"></path>
          </svg>
          <span tw="border-b hover:(border-color[var(--brand-color-red)])">
            office@labrys.cz
          </span>
        </a>
      </Link>
      <Link href="#">
        <a tw="flex items-center ml-4 color[var(--default-text-color)] border-b hover:(color[var(--brand-color-red)] border-color[var(--brand-color-red)])">
          <svg
            tw="h-3 fill-current"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.5 3h2.5v-3h-2.5c-1.93 0-3.5 1.57-3.5 3.5v1.5h-2v3h2v8h3v-8h2.5l0.5-3h-3v-1.5c0-0.271 0.229-0.5 0.5-0.5z"></path>
          </svg>
        </a>
      </Link>
    </div>
  );
}
