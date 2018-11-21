import React from "react";
import ImageTable from "./imageTable";
import PaginationBar from "./paginationBar";

const Gallery = () => {
  return (
    <React.Fragment>
      <ImageTable />
      <PaginationBar />
    </React.Fragment>
  );
};

export default Gallery;
