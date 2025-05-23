import { configureStore } from "@reduxjs/toolkit";
import userDetailsSlice from "./Slices/userSlice.js";
import dataSlice from "./Slices/dataSlice.js";
const store = configureStore({
  reducer: {
    userDetails: userDetailsSlice,
    data: dataSlice,
  },
});

export default store;
