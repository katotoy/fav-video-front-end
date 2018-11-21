import React, { Component } from "react";
import ImageBox from "./imageBox";
import { Consumer } from "../services/myProvider";

class ImageTable extends Component {
  computeColNums = video_data_len => {
    let colNums = [0, 0, 0];
    const rowNum = Math.ceil(video_data_len / 3);

    for (let x = 0; x < rowNum; x++) colNums[x] = 3;

    if (video_data_len % 3 !== 0) colNums[rowNum - 1] = video_data_len % 3;

    return colNums;
  };

  paginateData = context => {
    const { videos, pagination } = context.state;
    const currentPage = pagination.currentPage;

    /* for testing */
    // const videos = original_data.slice(0, 5);

    const PAGE_SIZE = 9;
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const numSets = Math.ceil(videos.length / PAGE_SIZE);
    let endIndex = 0;

    if (currentPage < numSets) {
      if (videos.length >= currentPage * PAGE_SIZE) {
        endIndex = currentPage * PAGE_SIZE;
      } else {
        endIndex = videos.length + currentPage * PAGE_SIZE;
      }
    } else {
      if (videos.length % PAGE_SIZE === 0) {
        endIndex = videos.length;
      } else {
        endIndex = (videos.length % PAGE_SIZE) + (currentPage - 1) * PAGE_SIZE;
      }
    }

    const data = videos.slice(startIndex, endIndex);

    return data;
  };

  createTable = context => {
    this.paginateData(context);

    let video_data = [...context.state.videos];
    let rowNum = 0;
    let colNums = [];
    let table = [];
    let video_data_len = 0;
    let video_index = 0;

    if (video_data.length !== 0) {
      /* slice the video data based on page number (starting index) and ending index as per the size of the data */
      video_data = this.paginateData(context);

      video_data_len = video_data.length;
      rowNum = Math.ceil(video_data_len / 3);
      colNums = [...this.computeColNums(video_data_len)];
    } else {
      return null;
    }

    for (let x = 0; x < rowNum; x++) {
      let children = [];
      for (let y = 0; y < colNums[x]; y++) {
        children.push(
          <ImageBox
            videoID={video_data[video_index].id}
            videoUrl={video_data[video_index].url}
            key={video_data[video_index].url + y}
            videoTitle={video_data[video_index].title}
          />
        );
        video_index++;
      }
      table.push(
        <div key={x} className="d-flex">
          {children}
        </div>
      );
    }

    return table;
  };

  render() {
    return (
      <Consumer>
        {context => (
          <React.Fragment>{this.createTable(context)}</React.Fragment>
        )}
      </Consumer>
    );
  }
}

export default ImageTable;
