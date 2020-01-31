import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSetSelectedPhotoAction } from "../redux.js";
import shortid from "shortid";
import _ from "lodash";
import "../styles/fluid-gallery.css";

export default function AllPhotos(props) {
  const photos = useSelector(state => state.photos);
  const currentView = useSelector(state => state.currentView);
  const dispatch = useDispatch();
  return (
    <div
      style={{ display: currentView === "ALL_PHOTOS" ? "block" : "none" }}
      className="tz-gallery"
    >
      <div className="row">
        {photos.map((photo, i) => {
          return (
            <div className="col-sm-4 col-md-2" key={shortid.generate()}>
              <div className="image-wrapper">
                <img
                  className="image"
                  src={`data:image/png;base64,${photo.base64}`}
                  alt={photo.fileName}
                  onClick={() => dispatch(createSetSelectedPhotoAction(photo))}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
