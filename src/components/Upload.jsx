import React from "react";
import _ from "lodash";
import "../styles/upload.css";

export default function Upload(props) {
  return (
    <div className="file-upload">
      <input
        id="uploader"
        type="file"
        onChange={e => {
          if (e.target.files.length) props.uploadPhoto(e.target.files[0]);
        }}
      />
      <button
        className="button"
        onClick={e => {
          document.getElementById("uploader").click();
        }}
      >
        Upload File!
      </button>
    </div>
  );
}
