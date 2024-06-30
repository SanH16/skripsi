import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIauth } from "@/apis/APIauth";

export const fetchGetUserLogin = createAsyncThunk(
  "fetch/getUserLogin",
  APIauth.getUserLogin,
);

const initialState = {
  message: "",
  status: "idle",
  data: null,
};

const getUserLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("fetch/getUserLogin/pending", (state) => {
      state.status = "loading";
      state.message = "";
    });

    builder.addCase("fetch/getUserLogin/fulfilled", (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });

    builder.addCase("fetch/getUserLogin/rejected", (state, { error }) => {
      state.status = "failed";
      state.message = error.stack;
    });
  },
});

export const selectGetUserLogin = (state) => state.userLogin;
export default getUserLoginSlice.reducer;
