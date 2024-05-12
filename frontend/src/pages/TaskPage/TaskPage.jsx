import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import AddPopupWindow from "../../components/PopupWindows/AddPopupWindow/AddPopupWindow";
import EditPopupWindow from "../../components/PopupWindows/EditPopupWindow/EditPopupWindow";
import RemovePopupWindow from "../../components/PopupWindows/RemovePopupWindow/RemovePopupWindow";

const TaskPage = () => {
  return (
    <div>
      <NavBar></NavBar>
      <Hero></Hero>
      <AddPopupWindow></AddPopupWindow>
      <EditPopupWindow></EditPopupWindow>
      <RemovePopupWindow></RemovePopupWindow>
    </div>
  );
};

export default TaskPage;
