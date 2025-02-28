import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("token") ? { role: localStorage.getItem("role") } : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
