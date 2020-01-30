import React from "react";
import { AppContext, createSetViewAction } from "./App.jsx";

import "../styles/navbar.css";
import _ from "lodash";
import Upload from "./Upload";

export default function Navbar(props) {
  const { state, dispatch } = React.useContext(AppContext);
  return (
    <div className="navbar">
      <div
        className="navbar-header"
        onClick={() => dispatch(createSetViewAction("ALL_PHOTOS"))}
      >
        Uploader
      </div>
      <Upload uploadPhoto={props.uploadPhoto} />
    </div>
  );
}
