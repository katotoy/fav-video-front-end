import React, { Component } from "react";
import { toast } from "react-toastify";
import http from "../utils";
import likeService from "../services/likes";
import videoService from "../services/video";

import IFrame from "./iframe";
import InfoDiv from "./infoDiv";

class ViewVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeStatus: "Loading...",
      likeCount: 0,
      videoID: this.props.match.params.videoID,
      videoInfo: {}
    };
  }

  async componentDidMount() {
    try {
      const { data: likeCountData } = await likeService.getVideoLikesCount(
        this.state.videoID
      );

      const { data } = await likeService.didMemberLikedTheVideo(
        this.state.videoID
      );

      const { data: data1 } = await videoService.getVideoDetail(
        this.state.videoID
      );

      // check the number of likes
      // sets the button to display Like or Unlike
      // sets the videoInfo from the resutl of getVideoDetail
      this.setState({
        likeStatus: data.did_member_liked ? "Unlike" : "Like",
        likeCount: likeCountData.like_count,
        videoInfo: data1
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(
          "An error occured while checking if member liked this video or not."
        );
      }
    }
  }

  handleLikeButton = async () => {
    const currentLikeStatus = this.state.likeStatus;
    const newLikeStatus = currentLikeStatus === "Like" ? "Unlike" : "Like";

    this.setState({ likeStatus: newLikeStatus });

    try {
      const { data } = await likeService.LikeTheVideo(this.state.videoID);

      if (data.didMemberLiked && newLikeStatus === "Like") {
        this.setState({ likeStatus: "Unlike" });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(
          "An error occured while liking\\unlikingloading this video"
        );
      }
    }
  };

  handleEditButton = viewUrl => {
    this.props.history.push(viewUrl);
  };

  handleDeleteButton = async videoID => {
    await videoService.deleteVideo(videoID);
    this.props.history.push("/myshare");
  };

  getViewUrl(videoID) {
    return `/video_detail/${videoID}`;
  }

  displayButtons(member_id, videoID) {
    if (member_id === http.getCurrentUser()) {
      return (
        <div>
          <button
            onClick={() => this.handleEditButton(this.getViewUrl(videoID))}
            type="button"
            className="btn btn-success m-2"
          >
            Edit
          </button>
          <button
            onClick={() => this.handleDeleteButton(this.state.videoID)}
            type="button"
            className="btn btn-danger m-2"
          >
            Delete
          </button>
        </div>
      );
    } else if (http.getCurrentUser()) {
      return (
        <button
          type="button"
          onClick={this.handleLikeButton}
          className="btn btn-primary m-2"
        >
          {this.state.likeStatus}
        </button>
      );
    }
  }

  createIframe = () => {
    if (http.isEmpty(this.state.videoInfo)) return;

    const {
      id,
      url,
      title,
      description,
      date_posted,
      member_id
    } = this.state.videoInfo;

    const videoEmbedCode = `https://www.youtube.com/embed/${url}`;

    return (
      <React.Fragment>
        <IFrame videoID={id} videoEmbedCode={videoEmbedCode} />
        <InfoDiv
          title={title}
          description={description}
          datePosted={date_posted}
          likeCount={this.state.likeCount}
        />
        {this.displayButtons(member_id, id)}
      </React.Fragment>
    );
  };
  render() {
    return <div className="container">{this.createIframe()}</div>;
  }
}

export default ViewVideo;
