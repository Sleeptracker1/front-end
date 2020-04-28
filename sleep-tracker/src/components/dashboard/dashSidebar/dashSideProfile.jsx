import React from "react";
import {
  Container,
  ProfileImg,
  ProfileUsername,
} from "./dashSideProfile.styled";
import Avatar from "../../../assets/images/default-avatar.svg";
const SideProfile = () => {
  return (
    <div>
      <Container>
        <ProfileImg src={Avatar} atl="avatar" />
        <ProfileUsername>Profile name</ProfileUsername>
      </Container>
    </div>
  );
};

export default SideProfile;
