import { configureStore } from "@reduxjs/toolkit";

// Slices or Reducers
import AuthReducer from "./slices/Auth";
import ProductsReducer from "./slices/Products";
import CartReducer from "./slices/Cart";
import WishlistReducer from "./slices/Wishlist";

export const reduxStore = configureStore({
  reducer: {
    auth: AuthReducer,
    products: ProductsReducer,
    cart: CartReducer,
    wishlist: WishlistReducer,
  },
});
