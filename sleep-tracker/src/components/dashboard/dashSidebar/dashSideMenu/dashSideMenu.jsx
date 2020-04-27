import React from "react";
import MenuItem from "./menuItem";
import { Container } from "./dashSideMenu.styled";

const SideMenu = () => {
  return (
    <Container>
      <MenuItem />
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </Container>
  );
};
export default SideMenu;
