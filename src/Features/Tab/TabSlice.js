import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: localStorage.getItem("activeTab") || null,
};

export const tabSlice = createSlice({
  name: "tab",
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
      localStorage.setItem("activeTab", action.payload);
    },
    resetActiveTab: (state) => {
      state.activeTab = null;
      localStorage.removeItem("activeTab");
    },
    
  },
});

export const { setActiveTab, resetActiveTab } = tabSlice.actions;
export default tabSlice.reducer;
