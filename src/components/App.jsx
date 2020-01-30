import React, { useState, useEffect, useLayoutEffect } from "react";
import "../styles/styles.css";

import Navbar from "./Navbar.jsx";
import AllPhotos from "./AllPhotos.jsx";
import SinglePhoto from "./SinglePhoto.jsx";

import {
  listObjects,
  getSingleObject,
  saveObject,
  deleteObject
} from "../utils/index.js";

const baguetteBox = window.baguetteBox;

export default function App() {
  const [currentView, setCurrentView] = useState("ALL_PHOTOS");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [loading, setLoading] = useState("");
  const uploadFile = file => {
    saveObject(file).then(data => {
      reloadPhotos();
    });
  };

  const reloadPhotos = () => {
    setLoading("Loading images...");
    setCurrentView("LOADING");
    listObjects().then(data => {
      let numPhotos = data.length;
      if (numPhotos === photos.length) return setCurrentView("ALL_PHOTOS");
      let numCompleted = 0;
      const newPhotos = [];
      setLoading(`loading ${numCompleted}/${numPhotos} images`);

      data.forEach((el, i) =>
        getSingleObject(el.Key).then(string => {
          newPhotos.push({
            base64: string,
            fileName: data[i].Key
          });
          numCompleted++;
          setLoading(`loading ${numCompleted}/${numPhotos} images`);

          if (numCompleted == numPhotos) {
            setPhotos(newPhotos);
            setCurrentView("ALL_PHOTOS");
          }
        })
      );
    });
  };
  const setImageIndex = index => {
    setSelectedPhoto(photos[index]);
    setCurrentView("SINGLE_PHOTO");
  };
  useEffect(() => {
    reloadPhotos();
  }, []);
  useEffect(() => {
    baguetteBox.run(".tz-gallery");
  }, [photos]);

  let body = "";
  if (currentView === "SINGLE_PHOTO") {
    body = <SinglePhoto selectedPhoto={selectedPhoto} />;
  } else if (currentView === "LOADING") {
    body = <div>{loading}</div>;
  }

  return (
    <div className="app">
      <Navbar setCurrentView={setCurrentView} uploadFile={uploadFile} />
      {body}
      <AllPhotos
        photos={photos}
        setImageIndex={setImageIndex}
        currentView={currentView}
      />
    </div>
  );
}
