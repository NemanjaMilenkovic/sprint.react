import React from "react";
import "../styles/navbar.css";
import _ from "lodash";
import Upload from "./Upload";

export default function Navbar(props) {
  return (
    <div className="navbar">
      <div
        className="navbar-header"
        onClick={() => props.setCurrentView("ALL_PHOTOS")}
      >
        Uploader
      </div>
      <Upload uploadFile={props.uploadFile} />
    </div>
  );
}
