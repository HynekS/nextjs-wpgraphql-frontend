type ChildrenProps = {
  children?: React.ReactNode;
};

export default function ContentWrapper({ children }: ChildrenProps) {
  return <main tw="mx-auto px-6 pb-24 max-width[60em]">{children}</main>;
}
