import React from "react";
import {
  Container,
  StyledLink,
  LinkContainer,
} from "./dashSideMenu/menuItem.styled";

export default function Links() {
  return (
    <LinkContainer>
      <Container>
        <StyledLink to={"/user-dashboard"}>Dashboard</StyledLink>
      </Container>
      <Container>
        <StyledLink to={"/add-sleep-routine"}>Add Sleep Entry</StyledLink>
      </Container>
    </LinkContainer>
  );
}
