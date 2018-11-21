import React from "react";
import { Consumer } from "../services/myProvider";

const PaginationBar = () => {
  function getPageItemStyle({ state }, item) {
    const currentPage = state.pagination.currentPage;

    return currentPage === item ? "page-item active" : "page-item";
  }

  function createPageBar(context) {
    const video_data_len = context.state.videos.length;

    if (video_data_len !== 0) {
      let pageBar = [];
      const numPages = Math.ceil(video_data_len / 9);

      if (numPages === 0) return null;

      for (let x = 1; x <= numPages; x++) {
        pageBar.push(
          <li key={x} className={getPageItemStyle(context, x)}>
            <p
              className="page-link"
              onClick={() => context.changeCurrentPage(x)}
            >
              {x}
            </p>
          </li>
        );
      }

      return pageBar;
    }

    return null;
  }

  return (
    <nav>
      <ul className="pagination">
        <Consumer>{content => createPageBar(content)}</Consumer>
      </ul>
    </nav>
  );
};

export default PaginationBar;
