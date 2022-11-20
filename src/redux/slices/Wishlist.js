import { createSlice } from "@reduxjs/toolkit";

const WishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishList: (state, action) => {
      state.wishlistItems.push({ ...action.payload, qty: 1 });
    },
    removeFromWishlist: (state, action) => {
      let remainingItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
      state.wishlistItems = remainingItems;
    },
  },
});

export const { addToWishList, removeFromWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
