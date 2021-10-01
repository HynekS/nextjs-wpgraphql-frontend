import Logo from "@components/logo";

export default function Header({ children }) {
  return (
    <div tw="pt-5 px-4 background[url('/assets/images/triangles.svg') repeat-x 0 -12px] md:(px-6)">
      <header tw="my-0 mx-auto max-width[60em] flex justify-between">
        <Logo />
        {children}
      </header>
    </div>
  );
}
