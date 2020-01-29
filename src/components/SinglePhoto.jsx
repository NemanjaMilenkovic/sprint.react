import React from "react";

export default function SinglePhoto(props) {
  return (
    <div>
      <img
        className="single-photo"
        alt="asdf"
        src={`data:image/png;base64,${props.selectedPhoto}`}
      />
    </div>
  );
}
