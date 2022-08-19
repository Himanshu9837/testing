import React from "react";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Pagination = (props) => {
  const { postParPage, totalPosts, currentPage, paginate, nextPage, prevPage } =
    props;
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postParPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      {currentPage !== 0 && (
        <div className="icon_next_style" >
          <ArrowBackIosIcon onClick={() => prevPage()}/>
        </div>
      )}
      {pageNumbers.map((num) => (
        <div key={num} 
        // className="page-item" 
        className={currentPage === num-1 ? 'page-item2' : 'page-item'}  >
          <a onClick={() => paginate(num)} className={currentPage === num-1 ? 'active' : 'page-link'}
>
            {num}
          </a>
        </div>
      ))}
      {pageNumbers.length !== currentPage +1 && (
        <div className="icon_next_style">
          <ArrowForwardIosIcon onClick={nextPage} />
        </div>
      )} 
    </div>
  );
};
export default Pagination;
