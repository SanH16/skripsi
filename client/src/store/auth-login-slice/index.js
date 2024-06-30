import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { APIauth } from "@/apis/APIauth";

export const fetchGetAuthLogin = createAsyncThunk(
  "fetch/getAuthLogin",
  APIauth.login,
);

const initialState = {
  message: "",
  status: "idle",
  data: null,
};

const getAuthLoginSlice = createSlice({
  name: "authLogin",
  initialState,
  extraReducers: (builder) => {
    builder.addCase("fetch/getAuthLogin/pending", (state) => {
      state.status = "loading";
      state.message = "";
    });

    builder.addCase("fetch/getAuthLogin/fulfilled", (state, { payload }) => {
      state.status = "success";
      state.data = payload;
    });

    builder.addCase("fetch/getAuthLogin/rejected", (state, { error }) => {
      state.status = "failed";
      state.message = error.stack;
    });
  },
});

export const selectAuthLogin = (state) => state.authLogin;
export default getAuthLoginSlice.reducer;
