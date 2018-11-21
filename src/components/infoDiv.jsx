import { formatDate } from "../utils";

import React from "react";

const InfoDiv = props => {
  return (
    <React.Fragment>
      <div className="row">
        <div className="border-0 font-weight-bold col-9">{props.title}</div>
        {props.likeCount !== 0 && (
          <div className="col font-weight-bold">
            ❤ <small>{props.likeCount}</small>
          </div>
        )}
      </div>
      <div className="border-0">
        <small>Description: {props.description}</small>
      </div>
      <div className="border-0">
        <small>Date Posted: {formatDate(props.datePosted)}</small>
      </div>
    </React.Fragment>
  );
};

export default InfoDiv;
