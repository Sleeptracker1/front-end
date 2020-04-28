import React from "react";
import { Container } from "./dashSidebar.styled";
import SideProfile from "./dashSideProfile";
import SideMenu from "./dashSideMenu/dashSideMenu";

const DashSidebar = () => {
  return (
    <Container>
      <SideProfile />
      <SideMenu />
    </Container>
  );
};
export default DashSidebar;
