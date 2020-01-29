import React from "react";
import shortid from "shortid";
import _ from "lodash";

export default function AllPhotos(props) {
  return (
    <div>
      {props.photos.map((photo, i) => {
        return (
          <div className="imageCell" key={shortid.generate()}>
            <div>
              <img
                className="image"
                src={`data:image/png;base64,${photo}`}
                alt="asdfdsaf"
                onClick={() => props.setImageIndex(i)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
