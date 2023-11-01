import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const addCurrentUser = (state, { payload }) => {
  state.currentUser = payload;
};

export const createUser = createAsyncThunk(
  "user/createUser",
  async (options, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, options);
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (options, thunkAPI) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, options);
      const login = await axios.post(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${response.data.access_token}`,
        },
      });
      return login.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (options, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/${options.id}`,
        options
      );
      return response.data;
    } catch (e) {
      thunkAPI.rejectWithValue(e);
    }
  }
);

const userSlice = createSlice({
  name: "@@user",
  initialState: {
    currentUser: null,
    cart: [],
    formType: "signup",
    showForm: false,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const existedElement = state.cart.find(({ id }) => id === payload.id);
      if (existedElement) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else {
        newCart.push({ ...payload, quantity: 1 });
      }
      state.cart = newCart;
    },
    removeItemFromCart: (state, { payload }) => {
      state.cart = state.cart.filter(({ id }) => id !== payload);
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, addCurrentUser);
    builder.addCase(loginUser.fulfilled, addCurrentUser);
    builder.addCase(updateUser.fulfilled, addCurrentUser);
  },
});

export const { addItemToCart, removeItemFromCart, toggleForm, toggleFormType } =
  userSlice.actions;
export default userSlice.reducer;
