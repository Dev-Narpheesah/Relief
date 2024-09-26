import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    userSignUp: (state, action) => {
      state = action.payload;
    },
    userLogin: (state, action) => {
      state = action.payload;
    },
  },
});

export const selectAllUsers = (state) => state.users;

export const { userSignUp, userLogin } = usersSlice.actions;

export default usersSlice.reducer;
