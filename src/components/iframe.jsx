import React from "react";
const IFrame = props => {
  return (
    <iframe
      className="shadow p-2 mt-4 bg-light rounded"
      title={props.videoID}
      width="958"
      height="539"
      src={props.videoEmbedCode}
      frameBorder="0"
    />
  );
};

export default IFrame;
