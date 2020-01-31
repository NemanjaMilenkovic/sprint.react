import React from "react";
import { useSelector } from "react-redux";

export default function SinglePhoto(props) {
  const state = useSelector(state => state);
  return (
    <img
      className="single-photo"
      alt={state.selectedPhoto.fileName}
      src={`data:image/png;base64,${state.selectedPhoto.base64}`}
    />
  );
}
