import React from "react";
import { Container } from "./dashSideMenu/menuItem.styled";
import { Link } from "react-router-dom";

export default function Links() {
  return (
    <ul>
      <Container>
        <Link to={"/user-dashboard"}>User Dashboard</Link>
      </Container>

      <Container>
        <Link to={"/sleep-routine"}>Sleep Routine</Link>
      </Container>
      <Container>
        <Link to={"/add-sleep-routine"}>Add Sleep Routine</Link>
      </Container>
    </ul>
  );
}
