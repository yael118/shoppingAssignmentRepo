import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7001/api';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'categories/fetchProductsByCategory',
  async (categoryId) => {
    const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}/products`);
    return { categoryId, products: response.data };
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    products: {},
    selectedCategory: null,
    loading: false,
    error: null,
  },
  reducers: {
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const { categoryId, products } = action.payload;
        state.products[categoryId] = products;
      });
  },
});

export const { selectCategory } = categorySlice.actions;
export default categorySlice.reducer;