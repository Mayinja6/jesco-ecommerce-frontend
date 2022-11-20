import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reduxContollers from "../reduxControllers";

const initialState = {
  products: [],
  categories: [],
  productsLoading: false,
  productsRejected: false,
  productsSuccess: false,
  productsMessage: "",
  newCreated: false,
  newReview: false,
};

export const fetch_all_products = createAsyncThunk("products/all", async () => {
  return await reduxContollers.fetchAllProducts();
});

export const fetch_product_by_id = createAsyncThunk(
  "products/productId",
  async (productId, thunkAPI) => {
    try {
      return await reduxContollers.getAProductById(productId);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const create_a_product = createAsyncThunk(
  "products/create",
  async (productData, thunkAPI) => {
    try {
      return await reduxContollers.create_product(productData);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const update_a_product = createAsyncThunk(
  "product/update",
  async (updateProductForm, thunkAPI) => {
    try {
      return await reduxContollers.update_product(updateProductForm);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const delete_a_product = createAsyncThunk(
  "products/delete",
  async (productId, thunkAPI) => {
    try {
      return await reduxContollers.delete_product(productId);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

export const review_a_product = createAsyncThunk(
  "product/review",
  async (reviewInfo, thunkAPI) => {
    try {
      return await reduxContollers.review_product(reviewInfo);
    } catch (err) {
      const errMessage = err.response.data || err.message;
      return thunkAPI.rejectWithValue(errMessage);
    }
  }
);

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    product_reset: (state) => {
      state.newCreated = false;
      state.newReview = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch_all_products.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(fetch_all_products.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsRejected = true;
        state.productsMessage = action.error.message;
      })
      .addCase(fetch_all_products.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.productsSuccess = true;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
      })
      .addCase(fetch_product_by_id.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(fetch_product_by_id.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsRejected = true;
        state.productsMessage = action.payload;
      })
      .addCase(fetch_product_by_id.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.productsSuccess = true;
        state.productDetails = action.payload;
      })
      .addCase(create_a_product.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(create_a_product.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.productsLoading = false;
        state.productsSuccess = true;
        state.newCreated = true;
      })
      .addCase(create_a_product.rejected, (state, action) => {
        state.productsRejected = true;
        state.productsLoading = false;
        state.productsMessage = action.payload;
      })
      .addCase(review_a_product.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(review_a_product.rejected, (state, action) => {
        state.productsMessage = action.payload;
        state.productsLoading = false;
        state.productsRejected = true;
      })
      .addCase(review_a_product.fulfilled, (state, action) => {
        state.productsSuccess = true;
        state.productsLoading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.newReview = true;
      })
      .addCase(delete_a_product.pending, (state) => {
        state.productsLoading = true;
        state.productsSuccess = false;
      })
      .addCase(delete_a_product.fulfilled, (state, action) => {
        state.productsLoading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.productsSuccess = true;
      })
      .addCase(delete_a_product.rejected, (state, action) => {
        state.productsLoading = false;
        state.productsMessage = action.payload;
        state.productsRejected = true;
      })
      .addCase(update_a_product.pending, (state) => {
        state.productsLoading = true;
      })
      .addCase(update_a_product.rejected, (state, action) => {
        state.productsLoading = false;
        state.updateFailed = true;
        state.productsMessage = action.payload;
      })
      .addCase(update_a_product.fulfilled, (state, action) => {
        state.productsSuccess = true;
        state.productsLoading = false;
        state.products = action.payload.products;
        state.categories = action.payload.categories;
        state.productUpdated = true;
      });
  },
});

export const { product_reset } = ProductsSlice.actions;
export default ProductsSlice.reducer;
