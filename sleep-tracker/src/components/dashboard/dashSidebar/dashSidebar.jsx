import React from "react";
import { Container } from "./dashSidebar.styled";
import SideProfile from "./dashSideProfile";
import SideMenu from "./dashSideMenu/dashSideMenu";
import Links from "./Links";

const DashSidebar = () => {
  return (
    <Container>
      <SideProfile />
      <SideMenu />
      <Links />
    </Container>
  );
};
export default DashSidebar;
