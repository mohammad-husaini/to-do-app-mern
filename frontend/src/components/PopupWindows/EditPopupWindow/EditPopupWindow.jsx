import { useState } from "react";
import "./EditPopupWindow.css";
import { useSelector, useDispatch } from "react-redux";
import { editClose, submit } from "../../../reducers/toggleSlice";
import closeIcon from "../../../assets/close.svg";
import axios from "axios";
const EditPopupWindow = () => {
  const editOpen = useSelector((state) => state.toggle.editPopupOpen);
  const taskId = useSelector((state) => state.toggle.taskId);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("بدون عنوان");
  const [description, setDescription] = useState("");

  const handleClosePopup = () => {
    dispatch(editClose());
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleOnClick = async () => {
    try {
      const token = localStorage.getItem("jwtToken");

      await axios.put(
        `http://localhost:5000/tasks/${taskId}`,
        { title, description },
        {
          headers: { Authorization: token },
        }
      );
      handleClosePopup();
      setTitle("بدون عنوان");
      setDescription("");
      dispatch(submit());
    } catch (error) {
      console.log(error);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      handleClosePopup();
    }
  };

  return (
    <div>
      {editOpen && (
        <div className="popup-overlay" onClick={handleOverlayClick}>
          <div className="popup">
            <div className="title-close">
              <img
                alt="close-icon"
                className="close-icon"
                onClick={handleClosePopup}
                src={closeIcon}
              ></img>
              <span className="title-span">تعديل مهمة جديدة</span>
            </div>
            <div className="title-field">
              <span className="title-label">عنوان المهمة</span>
              <div className="title-input">
                <input
                  onChange={handleTitleChange}
                  className="title-input-span"
                  placeholder="ادخل عنوان المهمة"
                ></input>
              </div>
            </div>
            <div className="describe-field">
              <span className="describe-span">الوصف</span>
              <div className="describe-input ">
                <input
                  onChange={handleDescriptionChange}
                  className="title-input-span"
                  placeholder="... ادخل الوصف"
                ></input>
              </div>
            </div>
            <div className="buttons">
              <div className="button-field">
                <button className="edit-button" onClick={handleOnClick}>
                  <span className="edit-button-span">تعديل المهمة</span>
                </button>
                <button className="close-button" onClick={handleClosePopup}>
                  <span className="close-button-span">الغاء العملية</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPopupWindow;
