import { useState } from "react";
import "./Pagination.css";
import downArrow from "../../assets/down.svg";
import leftArrow from "../../assets/left.svg";

const Pagination = (props) => {
  const { tasks, setCurrentPage, setLimit, limit } = props;
  const [toggleSize, setToggleSize] = useState(false);
  const page = tasks;
  const firstTaskOnPage = (page.currentPage - 1) * page.limit + 1;
  const lastTaskOnPage = Math.min(
    page.currentPage * page.limit,
    page.totalCount
  );

  const isFirstPage = page.currentPage === 1;
  const isLastPage =
    page.totalCount <= page.limit || lastTaskOnPage === page.totalCount;

  const handelOnClickLimit = (PageLimit) => {
    setLimit(PageLimit);
    handelOnClickToggleSize();
  };
  const handelOnClickToggleSize = () => {
    setToggleSize(!toggleSize);
  };
  const goToPreviousPage = () => {
    setCurrentPage(page.currentPage - 1);
  };

  const goToNextPage = () => {
    setCurrentPage(page.currentPage + 1);
  };

  return (
    <tfoot className="table-pagination">
      <div className="page-number-box">
        <button
          onClick={goToNextPage}
          className={`left-button ${isLastPage ? "disabled" : ""}`}
          disabled={isLastPage}
        >
          <img alt="left-arrow" src={leftArrow} className="left-arrow"></img>
        </button>
        <span className="page-number-text">
          {page.totalPages}
          <span className="page-number-text text-style-1">
            /{page.currentPage}
          </span>
        </span>
        <button
          onClick={goToPreviousPage}
          className={`right-button ${isFirstPage ? "disabled" : ""}`}
          disabled={isFirstPage}
        >
          <img alt="right-arrow" src={leftArrow} className="right-arrow"></img>
        </button>
      </div>
      <div className="page-size">
        <div className="page-size-number-box">
          <img
            onClick={handelOnClickToggleSize}
            alt="down-arrow"
            src={downArrow}
            className="page-size-down-arrow"
          ></img>

          <span className="page-size-number">{limit}</span>
        </div>

        <span className="page-size-text" lang="ar">
          :عدد الصفوف في الصفحة
        </span>
        {toggleSize && (
          <div className="page-size-down-option">
            <span
              className="page-size-down-option-span"
              onClick={() => handelOnClickLimit(15)}
            >
              15
            </span>
            <span
              className="page-size-down-option-span"
              onClick={() => handelOnClickLimit(10)}
            >
              10
            </span>
          </div>
        )}
      </div>
      <span className="from-to-element">{`${firstTaskOnPage}-${lastTaskOnPage} of ${page.totalCount}`}</span>
    </tfoot>
  );
};

export default Pagination;
