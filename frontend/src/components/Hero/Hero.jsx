import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Hero.css";
import empty from "../../assets/empty.png";
import TableContent from "../TableContent/TableContent";
import Pagination from "../Pagination/Pagination";
import TableHeader from "../TableHeader/TableHeader";
import { useSelector, useDispatch } from "react-redux";
import { addOpen } from "../../reducers/toggleSlice";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [search, setSearch] = useState("");
  const [completed, setCompleted] = useState("");
  const [completedChange, setCompletedChange] = useState("");

  const refresh = useSelector((state) => state.toggle.refresh);

  const handleOpenPopup = () => {
    dispatch(addOpen());
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("jwtToken");

        const response = await axios.get(
          `http://localhost:5000/tasks/search-by-title?page=${currentPage}&limit=${limit}&q=${search}&completed=${completed}`,
          {
            headers: { Authorization: token },
          }
        );
        setTasks(response);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        navigator("/login");
      }
    };

    fetchTasks();
  }, [currentPage, limit, search, refresh, completed, completedChange]);

  if (
    tasks?.status === 200 &&
    tasks?.data.totalCount === 0 &&
    !search &&
    !completed
  ) {
    return (
      <div className="hero">
        <div className="add-box">
          <p className="add-text">
            لايوجد لديك مهام حتى الان<br></br> دعنا نقوم باضافة مهام جديدة
          </p>
          <button className="add-button-main" onClick={handleOpenPopup}>
            <span className="add-button-plus">+</span> اضافة مهمة
          </button>
        </div>
        <img className="empty" alt="empty" src={empty}></img>
      </div>
    );
  }

  if (tasks?.status === 200 && tasks?.data.totalCount > 0) {
    return (
      <div className="hero">
        <table className="table">
          <TableHeader
            setSearch={setSearch}
            setCompleted={setCompleted}
          ></TableHeader>
          <TableContent
            tasks={tasks.data}
            setCompletedChange={setCompletedChange}
          ></TableContent>
          <Pagination
            setLimit={setLimit}
            limit={limit}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            tasks={tasks.data}
          ></Pagination>
        </table>
      </div>
    );
  }

  return (
    <div className="hero">
      <table className="table">
        <TableHeader
          setSearch={setSearch}
          setCompleted={setCompleted}
        ></TableHeader>
      </table>
    </div>
  );
};

export default Hero;
