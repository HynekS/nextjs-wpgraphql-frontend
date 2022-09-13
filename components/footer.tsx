import oc from "@lib/ocGetter";

export default function Footer() {
  return (
    <div tw="h-48 text-white background-color[#212529] text-gray-200">
      <footer tw="mx-auto pt-8 text-center max-width[60em]">
        © Labrys o.p.s. 2006–{new Date().getFullYear()}
        <img
          src="/assets/images/logo-mini.svg"
          tw="w-4 h-auto mx-auto my-4"
          alt=""
        />
      </footer>
    </div>
  );
}
