import { useState } from "react";
import "./TableHeader.css";
import search from "../../assets/search.png";
import filter from "../../assets/filter.png";
import plus from "../../assets/plus.png";
import sorting from "../../assets/sorting.svg";
import { useDispatch } from "react-redux";
import { addOpen } from "../../reducers/toggleSlice";

const TableHeader = ({ setSearch, setCompleted }) => {
  const dispatch = useDispatch();
  const [togglePopover, setTogglePopover] = useState(false);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterOnClick = () => {
    setTogglePopover(!togglePopover);
  };
  const handleShowAllOnClick = () => {
    setTogglePopover(!togglePopover);
    setCompleted("");
  };
  const handleShowCompletedOnClick = () => {
    setTogglePopover(!togglePopover);
    setCompleted(true);
  };
  const handleShowUnCompletedOnClick = () => {
    setTogglePopover(!togglePopover);
    setCompleted(false);
  };
  const handleOpenPopup = () => {
    dispatch(addOpen());
  };
  return (
    <thead className="header">
      <tr className="header-top">
        <td className="mini-add-button" onClick={handleOpenPopup}>
          <img alt="plus" src={plus} className="plus-icon"></img>
          <span className="button-span">{"اضافة مهمة"}</span>
        </td>
        <td className="search-filter">
          <div className="search">
            <input
              placeholder="البحث"
              onChange={handleOnChange}
              className="label-search"
            ></input>
            <img alt="search" src={search}></img>
          </div>
          <div className="filter" onClick={handleFilterOnClick}>
            <img alt="filter" src={filter} className="filter-icon"></img>
          </div>
          <div className={`filter-popover ${togglePopover ? "" : "disable"}`}>
            <span
              className="filter-popover-span"
              onClick={handleShowAllOnClick}
            >
              عرض الجميع
            </span>
            <span
              className="filter-popover-span"
              onClick={handleShowCompletedOnClick}
            >
              عرض المكتمل
            </span>
            <span
              className="filter-popover-span"
              onClick={handleShowUnCompletedOnClick}
            >
              عرض الغير مكتمل
            </span>
          </div>
        </td>
      </tr>
      <tr className="header-bottom">
        <th className="edit-remove-colum"></th>
        <th className="status-colum">
          <span className="status-text">الحالة</span>
        </th>
        <th className="describe-colum">
          <span className="describe-text">الوصف</span>
        </th>
        <th className="title-colum">
          <img className="sorting" alt="sorting" src={sorting}></img>
          <span className="title-text">العنوان</span>
        </th>
        <th className="number-colum">
          <img className="sorting" alt="sorting" src={sorting}></img>
          <span className="hash-tag">#</span>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader;
