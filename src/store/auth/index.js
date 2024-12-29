import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: { id: "", email: "", name: "", role: "" },
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action?.payload;
    },
    clearUserDetails: (state) => {
      state.user = { id: "", email: "", name: "", role: "" };
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action?.payload;
    },
  },
});

export const { setUserDetails, clearUserDetails, setIsAuthenticated } =
  userSlice.actions;

export default userSlice.reducer;
