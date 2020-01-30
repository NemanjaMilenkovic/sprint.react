import React from "react";
import shortid from "shortid";
import _ from "lodash";
import "../styles/fluid-gallery.css";

export default function AllPhotos(props) {
  return (
    <div
      style={{ display: props.currentView === "ALL_PHOTOS" ? "block" : "none" }}
      className="tz-gallery"
    >
      <div className="row">
        {props.photos.map((photo, i) => {
          return (
            <div className="col-sm-4 col-md-2" key={shortid.generate()}>
              <div className="image-wrapper">
                <img
                  className="image"
                  src={`data:image/png;base64,${photo.base64}`}
                  alt={photo.fileName}
                  onClick={() => props.setImageIndex(i)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
