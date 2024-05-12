import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: {
    addPopupOpen: false,
    editPopupOpen: false,
    removePopupOpen: false,
    taskId: null,
    refresh: false,
  },
};

const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    addOpen: (state) => {
      state.addPopupOpen = true;
    },
    addClose: (state) => {
      state.addPopupOpen = false;
    },
    editOpen: (state, action) => {
      state.editPopupOpen = true;
      state.taskId = action.payload;
    },
    editClose: (state) => {
      state.editPopupOpen = false;
      state.taskId = null;
    },
    removeOpen: (state, action) => {
      state.removePopupOpen = true;
      state.taskId = action.payload;
    },
    removeClose: (state) => {
      state.removePopupOpen = false;
      state.taskId = null;
    },
    submit: (state) => {
      state.refresh = !state.refresh;
    },
  },
});

export const {
  addOpen,
  addClose,
  editOpen,
  editClose,
  removeOpen,
  removeClose,
  submit,
} = toggleSlice.actions;
export default toggleSlice.reducer;
