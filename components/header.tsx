type ChildrenProps = {
  children?: React.ReactNode;
};

export default function Header({ children }: ChildrenProps) {
  return (
    <div tw="absolute inset-0 z-10 pointer-events-none background-image[url('/assets/images/triangles.svg')] bg-repeat-x background-position[0 -12px] md:(static pt-5 px-6)">
      <header tw="my-0 mx-auto max-width[60em] flex flex-col justify-between h-full pointer-events-none md:(flex-row h-auto)">
        {children}
      </header>
    </div>
  );
}
