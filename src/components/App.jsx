import React, { useState, useEffect } from "react";
import "../styles/styles.css";

import Navbar from "./Navbar.jsx";
import AllPhotos from "./AllPhotos.jsx";
import SinglePhoto from "./SinglePhoto.jsx";

import { listObjects, getSingleObject, saveObject } from "../utils/index.js";

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
      let numCompleted = 0;
      const newPhotos = [];
      setLoading(`loading ${numCompleted}/${numPhotos} images`);

      data.forEach(el =>
        getSingleObject(el.Key).then(string => {
          newPhotos.push(string);
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

  let body = "";
  if (currentView === "ALL_PHOTOS") {
    body = <AllPhotos photos={photos} setImageIndex={setImageIndex} />;
  } else if (currentView === "SINGLE_PHOTO") {
    body = <SinglePhoto selectedPhoto={selectedPhoto} />;
  } else {
    body = <div>{loading}</div>;
  }

  return (
    <div className="app">
      <Navbar setCurrentView={setCurrentView} uploadFile={uploadFile} />
      {body}
    </div>
  );
}
