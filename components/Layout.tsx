import { FC, ReactElement, PropsWithChildren, ReactNode } from "react";
import { Header } from "./";

const Layout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
