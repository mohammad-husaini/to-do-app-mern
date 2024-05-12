import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./reducers/toggleSlice";

const store = configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});

export default store;
