import { configureStore } from "@reduxjs/toolkit";
import tabReducer from "./Features/Tab/TabSlice";
export const store = configureStore({
  reducer: {
    tab: tabReducer,
  },
});
