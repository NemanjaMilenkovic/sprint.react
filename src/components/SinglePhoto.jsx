import React from "react";
import { AppContext } from "./App.jsx";

export default function SinglePhoto(props) {
  const { state } = React.useContext(AppContext);
  return (
    <img
      className="single-photo"
      alt={state.selectedPhoto.fileName}
      src={`data:image/png;base64,${state.selectedPhoto.base64}`}
    />
  );
}
