import React from "react";
import { NavBar } from "./NavBar";
import { Wrapper, WrapperVarient } from "./Wrapper";

interface layoutProps {
  variant?: WrapperVarient;
}

export const Layout: React.FC<layoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
