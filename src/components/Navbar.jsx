import React from "react";
import { useDispatch } from "react-redux";
import { createSetViewAction } from "../redux.js";

import "../styles/navbar.css";
import Upload from "./Upload";

export default function Navbar(props) {
  const dispatch = useDispatch();
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
