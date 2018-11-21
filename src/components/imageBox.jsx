import React from "react";
import { Link } from "react-router-dom";

export const ImageBox = props => {
  const imgWrap = {
    display: "inline",
    height: "90%",
    width: "100%"
  };
  function createImgSrc(videoID) {
    return `https://img.youtube.com/vi/${videoID}/0.jpg`;
  }

  function getViewUrl(videoID) {
    return `/view_video/${videoID}`;
  }

  return (
    <div className="col-4 shadow-lg p-3 bg-white rounded m-2">
      <Link to={getViewUrl(props.videoID)}>
        <img
          style={imgWrap}
          src={createImgSrc(props.videoUrl)}
          alt="Video Thumbnail"
        />
      </Link>
      <div className="text-center text-white bg-primary rounded center">
        <strong>
          <small>{props.videoTitle}</small>
        </strong>
      </div>
    </div>
  );
};

export default ImageBox;
