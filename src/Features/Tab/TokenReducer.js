import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null || sessionStorage.getItem("token"),
};

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      sessionStorage.setItem("token", action.payload);
    },

    removeToken: (state) => {
      state.token = null;
      sessionStorage.removeItem("token");
    },
  },

});

export const { setToken, removeToken } = tokenSlice.actions;
export default tokenSlice.reducer;