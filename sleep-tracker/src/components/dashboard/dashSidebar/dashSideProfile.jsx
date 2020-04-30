import React from "react";
import { connect } from "react-redux";
import Avatar from "../../../assets/images/default-avatar.svg";

const SideProfile = ({ welcome }) => {
  const split = welcome.split(" ");
  return (
    <div className="profile-container">
      <div className="img-container">
        <img src={Avatar} alt="user avatar" />
      </div>
      <h1>{split[1]}</h1>
    </div>
  );
};
const mapState = (state) => ({
  welcome: state.auth.currentUser.message,
});
export default connect(mapState, null)(SideProfile);
