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
  const uploadFile = file => {
    saveObject(file).then(data => {
      reloadPhotos();
    });
  };

  const reloadPhotos = () => {
    listObjects().then(data => {
      Promise.all(data.map(el => getSingleObject(el.Key))).then(data => {
        setPhotos(data);
      });
    });
  };
  const setImageIndex = index => {
    setSelectedPhoto(photos[index]);
    setCurrentView("SINGLE_PHOTO");
  };
  useEffect(reloadPhotos, []);

  return (
    <div className="app">
      <Navbar setCurrentView={setCurrentView} uploadFile={uploadFile} />
      {currentView === "ALL_PHOTOS" ? (
        <AllPhotos photos={photos} setImageIndex={setImageIndex} />
      ) : (
        <SinglePhoto selectedPhoto={selectedPhoto} />
      )}
    </div>
  );
}
