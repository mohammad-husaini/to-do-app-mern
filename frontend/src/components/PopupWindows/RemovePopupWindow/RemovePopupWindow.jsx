import "./RemovePopupWindow.css";
import { useSelector, useDispatch } from "react-redux";
import { removeClose, submit } from "../../../reducers/toggleSlice";
import closeIcon from "../../../assets/close.svg";
import warningImg from "../../../assets/delete.png";
import axios from "axios";
const RemovePopupWindow = () => {
  const removeOpen = useSelector((state) => state.toggle.removePopupOpen);
  const taskId = useSelector((state) => state.toggle.taskId);
  const dispatch = useDispatch();

  const handleClosePopup = () => {
    dispatch(removeClose());
  };

  const handleOnClick = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
        headers: { Authorization: token },
      });
      handleClosePopup();
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
      {removeOpen && (
        <div className="popup-overlay" onClick={handleOverlayClick}>
          <div className="popup">
            <div className="title-close">
              <img
                alt="close-icon"
                className="close-icon"
                onClick={handleClosePopup}
                src={closeIcon}
              ></img>
            </div>
            <div className="frame">
              <img
                className="warning-img"
                src={warningImg}
                alt="warning-img"
              ></img>
              <span className="title-span">هل حقا تود حذف المهمة</span>
              <span className="description-span ">
                انت على وشك حذف هذا المهمة, اذا قمت بلاستمرار في هذه العملية
                سيتم حذف هذه المهمة من قائمة المهمام
              </span>
            </div>
            <div className="buttons">
              <div className="button-field">
                <button className="remove-button" onClick={handleOnClick}>
                  <span className="remove-button-span">حذف المهمة</span>
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

export default RemovePopupWindow;
