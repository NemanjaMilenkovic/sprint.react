import React from "react";

export default function SinglePhoto(props) {
  return (
    <img
      className="single-photo"
      alt={props.selectedPhoto.fileName}
      src={`data:image/png;base64,${props.selectedPhoto.base64}`}
    />
  );
}
