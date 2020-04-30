import React from "react";
import { connect } from "react-redux";
import {
  Container,
  ProfileImg,
  ProfileUsername,
} from "./dashSideProfile.styled";
import Avatar from "../../../assets/images/default-avatar.svg";

const SideProfile = ({ welcome }) => {
  const split = welcome.split(" ");
  return (
    <div>
      <Container>
        <ProfileImg src={Avatar} atl="avatar" />
        <ProfileUsername>{split[1]}</ProfileUsername>
      </Container>
    </div>
  );
};
const mapState = (state) => ({
  welcome: state.auth.currentUser.message,
});
export default connect(mapState, null)(SideProfile);
