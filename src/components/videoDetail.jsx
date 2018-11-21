import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../utils";
import videoServices from "../services/video";

class VideoDetail extends Form {
  state = {
    data: { url: "", title: "", description: "" },
    errors: {},
    videoID: ""
  };

  schema = {
    url: Joi.string()
      .required()
      .min(6)
      .label("Video ID"),
    title: Joi.string()
      .required()
      .min(8)
      .max(95)
      .label("Title"),
    description: Joi.string()
      .required()
      .min(10)
      .label("Description")
  };

  async componentDidMount() {
    await this.populateForm();
  }

  populateForm = async () => {
    try {
      const videoID = this.props.match.params.videoID;
      if (!videoID) return;

      const { data } = await videoServices.getVideoDetail(videoID);
      const { id, url, title, description } = data;

      const oldValue = {
        url: url,
        title: title,
        description: description
      };

      this.setState({ data: oldValue, videoID: id });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  };

  doSubmit = async () => {
    try {
      await videoServices.saveVideo(
        this.state.data,
        http.getCurrentUser(),
        this.state.videoID
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }

    if (this.state.videoID) {
      // this.props.history.replace(`/view_video/${this.state.videoID}`);
      const viewVideoUrl = `/view_video/${this.state.videoID}`;
      this.props.history.push(viewVideoUrl);
    } else {
      console.log("redirect to my share");
      //return <Redirect to="/myshare" />;
      this.props.history.push("/myshare");
    }
  };

  render() {
    return (
      <div>
        <h3>{this.state.videoID ? "Edit Video" : "New Video"}</h3>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("url", "Youtube Video ID")}
          {this.renderInput("title", "Title")}
          {this.renderTextArea("description", "Description")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default VideoDetail;
