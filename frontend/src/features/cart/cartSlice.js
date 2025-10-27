import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cart/';

// Add to Cart
export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ _id, name, price }, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, { name, price });
      return { ...response.data, productId: _id };
    } catch (error) {
      const message = error.response.data.msg
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (cartEntryId, thunkAPI) => {
    try {
      const response = await axios.delete(API_URL + cartEntryId);
      return response.data;
    } catch (error) {
      const message = error.response.data.msg
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get Cart
export const getCart = createAsyncThunk(
  'cart/getCart',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);

      const cartItemsWithProductId = response.data.cartItems.map(item => ({
        ...item,
        productId: item.productId || item._id
      }));
      return { ...response.data, cartItems: cartItemsWithProductId };
    } catch (error) {
      const message = error.response.data.msg
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [],
    totalPrice: 0,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const newItem = action.payload;
        const existingItem = state.cartItems.find(item => item.productId === newItem.productId);

        if (!existingItem) {
          state.cartItems.push(newItem);
        }
        state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price, 0);
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        const cartEntryIdToRemove = action.meta.arg;
        state.cartItems = state.cartItems.filter(item => item._id !== cartEntryIdToRemove);
        state.totalPrice = state.cartItems.reduce((acc, item) => acc + item.price, 0);
        state.error = null;
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload.cartItems;
        state.totalPrice = action.payload.totalPrice;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;