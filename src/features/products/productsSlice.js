import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BASE_URL } from "../../utils/constants";
import { shuffle } from "../../utils/common";
import axios from "axios";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/products`);
      return res.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

const productsSlice = createSlice({
  name: "@@products",
  initialState: {
    list: [],
    filtered: [],
    related: [],
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.list.filter(({ price }) => price < payload);
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.list.filter(({ category: { id } }) => id === payload);
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload;
    });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;

export default productsSlice.reducer;
