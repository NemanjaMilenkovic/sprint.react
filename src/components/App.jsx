import React, { useEffect } from "react";
import "../styles/styles.css";

import Navbar from "./Navbar.jsx";
import AllPhotos from "./AllPhotos.jsx";
import SinglePhoto from "./SinglePhoto.jsx";

import { listObjects, getSingleObject, saveObject } from "../utils/index.js";
export const AppContext = React.createContext();
const initialState = {
  currentView: "ALL_PHOTOS",
  photos: [],
  selectedPhoto: "",
  loading: ""
};
const reducer = (state, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "SET_PHOTOS":
      newState.photos = action.photos;
      newState.currentView = "ALL_PHOTOS";
      return newState;
    case "SET_VIEW":
      newState.currentView = action.view;
      return newState;
    case "SET_LOADING":
      newState.loading = action.loading;
      newState.currentView = "LOADING";
      return newState;
    case "SET_SELECTED_PHOTO":
      newState.selectedPhoto = action.photo;
      newState.currentView = "SINGLE_PHOTO";
      return newState;
    default:
      return newState;
  }
};
export function createSetPhotosAction(photos) {
  return { type: "SET_PHOTOS", photos };
}
export function createSetLoadingAction(loading) {
  return { type: "SET_LOADING", loading };
}
export function createSetViewAction(view) {
  return { type: "SET_VIEW", view };
}
export function createSetSelectedPhotoAction(photo) {
  return { type: "SET_SELECTED_PHOTO", photo };
}

export default function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const uploadPhoto = file => {
    saveObject(file).then(data => reloadPhotos());
  };
  const reloadPhotos = () => {
    dispatch(createSetLoadingAction("Loading images..."));
    listObjects().then(data => {
      let numPhotos = data.length;
      if (numPhotos === state.photos.length)
        return dispatch(createSetViewAction("ALL_PHOTOS"));
      let numCompleted = 0;
      const newPhotos = [];
      dispatch(
        createSetLoadingAction(`loading ${numCompleted}/${numPhotos} images`)
      );

      data.forEach((el, i) =>
        getSingleObject(el.Key).then(string => {
          newPhotos.push({
            base64: string,
            fileName: data[i].Key
          });
          newPhotos.sort((a, b) => (a.fileName > b.fileName ? 1 : -1));
          numCompleted++;
          dispatch(
            createSetLoadingAction(
              `loading ${numCompleted}/${numPhotos} images`
            )
          );
          if (numCompleted === numPhotos) {
            dispatch(createSetPhotosAction(newPhotos));
          }
        })
      );
    });
  };
  useEffect(() => {
    reloadPhotos();
  }, []);

  let body = "";
  if (state.currentView === "SINGLE_PHOTO") {
    body = <SinglePhoto />;
  } else if (state.currentView === "LOADING") {
    body = <div>{state.loading}</div>;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <div className="app">
        <Navbar uploadPhoto={uploadPhoto} />
        {body}
        <AllPhotos />
      </div>
    </AppContext.Provider>
  );
}
