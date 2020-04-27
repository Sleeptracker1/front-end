import React from "react";
import { Container } from "./dashSidebar.styled";
import SideProfile from "./dashSideProfile";
import Links from "./Links";
const DashSidebar = () => {
  return (
    <Container>
      <SideProfile />
      <Links />
    </Container>
  );
};
export default DashSidebar;
