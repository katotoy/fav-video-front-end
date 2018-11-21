import React, { Component } from "react";
import { toast } from "react-toastify";
import ImageBox from "./imageBox";
import http, { formatDate } from "../utils";
import videoService from "../services/video";
import likeService from "../services/likes";

class MyShare extends Component {
  state = {
    userVideos: {},
    userCountLike: {}
  };

  getStyle() {
    return {
      padding: "80px 0px"
    };
  }

  getUserVideosLikeCount = async () => {
    try {
      const { data } = await likeService.getUserVideosLikeCount();
      this.setState({ userCountLike: JSON.parse(data) });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error(
          "An error occured while retrieving summary of like counts for user videos"
        );
      }
    }
  };

  getUserVideos = async () => {
    try {
      const { data } = await videoService.getUserVideos();

      this.setState({ userVideos: JSON.parse(data) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(
          "An error occured while retrieving member's shared vidoeos."
        );
      }
    }
  };

  async componentDidMount() {
    await this.getUserVideos();
    await this.getUserVideosLikeCount();
  }

  displayUserGallery = () => {
    const { userVideos, userLikeCount } = this.state;

    if (
      http.isEmpty(userVideos) ||
      userVideos.length === 0 ||
      userVideos === undefined
    ) {
      return null;
    }

    return userVideos.map(video => (
      <div key={video.id} className="row">
        <ImageBox
          key={video.id}
          videoID={video.id}
          videoUrl={video.url}
          videoTitle={video.title}
        />
        <div style={this.getStyle()}>
          <div className="border-0">
            <small>Video ID:</small> <strong>{video.id}</strong>
          </div>
          <div className="border-0">
            <small>Date Posted:</small>{" "}
            <strong>{formatDate(video.date_posted)}</strong>
          </div>
          <div className="border-0">
            <small>No. of Likes:</small>{" "}
            <strong>
              {this.getUserVideosLikeCount(userLikeCount, video.id)}
            </strong>
          </div>
        </div>
      </div>
    ));
  };

  getUserVideosLikeCount = (list, findItem) => {
    if (!list) return;
    const likeCount = list.find(item => item.videoID === findItem);

    return likeCount === undefined ? 0 : likeCount.likeCount;
  };

  render() {
    return <div className="container">{this.displayUserGallery()}</div>;
  }
}

export default MyShare;
