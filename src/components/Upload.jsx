import React from "react";
import "../styles/upload.css";

export default function Upload(props) {
  return (
    <div className="file-upload">
      <input
        id="uploader"
        type="file"
        onChange={event => {
          if (event.target.files.length)
            props.uploadPhoto(event.target.files[0]);
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
