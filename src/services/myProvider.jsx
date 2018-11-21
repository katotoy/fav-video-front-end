import React, { Component } from "react";
import { toast } from "react-toastify";
import videoServices from "../services/video";
import memberServices from "../services/member";
import http from "../utils";

export const { Provider, Consumer } = React.createContext();

class CtxProvider extends Component {
  state = {
    videos: [],
    pagination: { currentPage: 1 },
    userCountLike: [],
    currentVideo: "",
    memberProfile: {}
  };

  componentDidMount() {
    this.getVideos();
    this.getMemberProfile();
  }

  getMemberProfile = async () => {
    const current_member_id = http.getCurrentUser();

    if (http.isEmpty(current_member_id)) return;

    try {
      const { data } = await memberServices.getMemberProfile();
      this.setState({ memberProfile: data });
    } catch (ex) {}
  };

  getVideos = async () => {
    try {
      const { data } = await videoServices.getAllVideos();
      this.setState({ videos: JSON.parse(data) });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast.error("An error occured while retrieving list of videos");
      }
    }
  };

  changeCurrentPage = item => {
    const pagination = { ...this.state.pagination };
    pagination.currentPage = item;
    this.setState({ pagination });
  };

  getVideoDetails = videoID => {
    return this.state.videos.filter(video => video.id === Number(videoID))[0];
  };

  setCurrentVideo = video => {
    console.log("Set Current Video");
  };

  saveVideo = (video_id, video_data) => {
    console.log(video_id, video_data);
  };

  render() {
    return (
      <Provider
        value={{
          state: this.state,
          changeCurrentPage: this.changeCurrentPage,
          getVideoDetails: this.getVideoDetails,
          setCurrentVideo: this.setCurrentVideo,
          saveVideo: this.saveVideo
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default CtxProvider;
