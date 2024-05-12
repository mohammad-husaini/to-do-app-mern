import "./TableContent.css";
import trash from "../../assets/8673120_ic_fluent_delete_filled_icon.svg";
import edit from "../../assets/8673166_ic_fluent_edit_filled_icon.svg";
import check from "../../assets/8673056_ic_fluent_checkmark_circle_filled_icon.svg";
import statusArrow from "../../assets/down.svg";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { editOpen, removeOpen } from "../../reducers/toggleSlice";
import axios from "axios";

const TableContent = ({ tasks, setCompletedChange }) => {
  const dispatch = useDispatch();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const handleStatusBoxClick = (taskId) => {
    setPopoverOpen(!popoverOpen);
    setSelectedTaskId(taskId);
  };
  const handleEditOpenPopup = (taskId) => {
    dispatch(editOpen(taskId));
  };

  const handleRemoveOpenPopup = (taskId) => {
    dispatch(removeOpen(taskId));
  };

  const handleStatusChange = async (status) => {
    const token = localStorage.getItem("jwtToken");
    await axios.put(
      `http://localhost:5000/tasks/${selectedTaskId}`,
      { completed: status },
      {
        headers: { Authorization: token },
      }
    );
    setCompletedChange(status);
    setPopoverOpen(false);
  };

  const content = tasks.tasks;

  const calculateTaskNumber = (index) => {
    return (tasks.currentPage - 1) * tasks.limit + index + 1;
  };
  const contentDisplay = content.map((task, index) => {
    return (
      <tr key={task._id} className="task">
        <td className="edit-remove-colum">
          <div className="edit-remove">
            <img
              className="trash-icon"
              onClick={() => handleRemoveOpenPopup(task._id)}
              alt="trash"
              src={trash}
            ></img>
            <img
              className="edit-icon"
              onClick={() => handleEditOpenPopup(task._id)}
              alt="edit"
              src={edit}
            ></img>
          </div>
        </td>
        <td className="status-colum">
          {task.completed ? (
            <div className="status-box-select">
              <div
                className="status-box-completed "
                onClick={() => handleStatusBoxClick(task._id)}
              >
                <img
                  alt="down-arrow"
                  src={statusArrow}
                  className="page-size-down-arrow"
                ></img>
                <span className="status-completed">مكتملة</span>
              </div>
              {popoverOpen && selectedTaskId === task._id && (
                <div
                  className="status-popover-uncompleted"
                  onClick={() => {
                    handleStatusChange(false);
                  }}
                >
                  <span className="status-uncompleted">غير مكتملة</span>
                </div>
              )}
            </div>
          ) : (
            <div className="status-box-select">
              <div
                className="status-box-uncompleted"
                onClick={() => handleStatusBoxClick(task._id)}
              >
                <img
                  alt="down-arrow"
                  src={statusArrow}
                  className="page-size-down-arrow"
                ></img>
                <span className="status-uncompleted">غير مكتملة</span>
              </div>
              {popoverOpen && selectedTaskId === task._id && (
                <div
                  className="status-popover-completed"
                  onClick={() => {
                    handleStatusChange(true);
                  }}
                >
                  <span className="status-completed">مكتملة</span>
                </div>
              )}
            </div>
          )}
        </td>
        <td className="describe-colum">
          <span className="describe">{task.description}</span>
        </td>
        <td className="title-colum">
          <span className="title">{task.title}</span>
        </td>
        <td className="number-colum">
          <span className="number">{calculateTaskNumber(index)}</span>
        </td>
        <td className="check-colum">
          <img
            className={`check-icon ${
              task.completed ? "" : "check-icon-disable"
            }`}
            alt="checkMark"
            src={check}
          ></img>
        </td>
      </tr>
    );
  });
  return <tbody className="table-content">{contentDisplay}</tbody>;
};

export default TableContent;
