import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSetPhotosAction,
  createSetLoadingAction,
  createSetViewAction
} from "../redux.js";
import "../styles/styles.css";

import Navbar from "./Navbar.jsx";
import AllPhotos from "./AllPhotos.jsx";
import SinglePhoto from "./SinglePhoto.jsx";

import { listObjects, getSingleObject, saveObject } from "../utils/index.js";

export default function App() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);

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
    <div className="app">
      <Navbar uploadPhoto={uploadPhoto} />
      {body}
      <AllPhotos />
    </div>
  );
}
