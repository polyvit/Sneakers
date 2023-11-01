import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { BASE_URL } from "../../utils/constants";
import axios from "axios";

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/categories`);
      return res.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

const categoriesSlice = createSlice({
  name: "@@categories",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});

export default categoriesSlice.reducer;
