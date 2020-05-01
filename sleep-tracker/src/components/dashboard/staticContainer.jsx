import React from "react";
import { connect } from "react-redux";
import Avatar from "../../assets/images/default-avatar.svg";
import Links from "./dashSidebar/Links";
import { Link } from "react-router-dom";

import SleepEntryForm from "./dashContent/SleepEntryForm";
const StaticContainer = ({ welcome }) => {
  const split = welcome.split(" ");
  return (
    <div className="static-container">
      <div className="static-side-bar">
        <div className="profile-container">
          <div className="img-container">
            <img src={Avatar} alt="user avatar" />
          </div>
          <h1>{split[1]}</h1>
          <Links />
        </div>
      </div>
      <SleepEntryForm />
    </div>
  );
};

const mapState = (state) => ({
  welcome: state.auth.currentUser.message,
});
export default connect(mapState, null)(StaticContainer);
