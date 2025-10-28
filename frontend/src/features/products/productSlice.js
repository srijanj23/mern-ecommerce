import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://mern-ecommerce-5k9a.onrender.com/api/products/';

// Get All Products
export const getAllProducts = createAsyncThunk('products/getAllProducts', async (_, thunkAPI) => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    const message =
      error.response.data.msg
    return thunkAPI.rejectWithValue(message);
  }
});

// Get Products by Category
export const getProductsByCategory = createAsyncThunk(
  'products/getProductsByCategory',
  async (category, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + 'category/' + category);
      return response.data;
    } catch (error) {
      const message =
        error.response.data.msg
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Sort Products
export const sortProducts = createAsyncThunk(
  'products/sortProducts',
  async ({ field, order }, thunkAPI) => {
    try {
      const response = await axios.get(API_URL + `sort/${field}/${order}`);
      return response.data;
    } catch (error) {
      const message =
        error.response.data.msg
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Filter Products by Date
export const filterProductsByDate = createAsyncThunk(
  'products/filterProductsByDate',
  async ({ from, to }, thunkAPI) => {
    try {
      const response = await axios.post(API_URL + 'filter-by-date', { from, to });
      return response.data;
    } catch (error) {
      const message =
        error.response.data.msg
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Add Product
export const addProduct = createAsyncThunk('products/addProduct', async (productData, thunkAPI) => {
  try {
    const response = await axios.post(API_URL, productData);
    return response.data;
  } catch (error) {
    const message =
      error.response.data.msg
    return thunkAPI.rejectWithValue(message);
  }
});

// Get One Product
export const getOneProduct = createAsyncThunk('products/getOneProduct', async (id, thunkAPI) => {
  try {
    const response = await axios.get(API_URL + id);
    return response.data;
  } catch (error) {
    const message =
      error.response.data.msg
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Product
export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, productData }, thunkAPI) => {
    try {
      const response = await axios.put(API_URL + id, productData);
      return response.data;
    } catch (error) {
      const message =
        error.response.data.msg
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Product (soft delete)
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
  try {
    const response = await axios.delete(API_URL + id);
    return response.data;
  } catch (error) {
    const message =
      error.response.data.msg
    return thunkAPI.rejectWithValue(message);
  }
});

// Restore Product
export const restoreProduct = createAsyncThunk('products/restoreProduct', async (id, thunkAPI) => {
  try {
    const response = await axios.put(API_URL + 'restore/' + id);
    return response.data;
  } catch (error) {
    const message =
      error.response.data.msg
    return thunkAPI.rejectWithValue(message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getProductsByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductsByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProductsByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sortProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sortProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(sortProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(filterProductsByDate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterProductsByDate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(filterProductsByDate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
        state.products = state.products.map((p) =>
          p._id === action.payload._id ? action.payload : p
        );
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.map((p) =>
          p._id === action.meta.arg ? { ...p, isActive: false } : p
        );
        state.error = null;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(restoreProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(restoreProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.map((p) =>
          p._id === action.meta.arg ? { ...p, isActive: true } : p
        );
        state.error = null;
      })
      .addCase(restoreProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
