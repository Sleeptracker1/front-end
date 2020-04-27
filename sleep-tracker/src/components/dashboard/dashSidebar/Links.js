import React from "react";

import { Link } from "react-router-dom";

export default function Links() {
  return (
    <ul>
      <li>
        <Link to={"/user-dashboard"}>User Dashboard</Link>
      </li>

      <li>
        <Link to={"/sleep-routine"}>Sleep Routine</Link>
      </li>
      <li>
        <Link to={"/add-sleep-routine"}>Add Sleep Routine</Link>
      </li>
    </ul>
  );
}
