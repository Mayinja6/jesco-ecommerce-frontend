import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cartItems.push({ ...action.payload, qty: 1 });
    },

    incrementCartItemQty: (state, action) => {
      let item = state.cartItems.find((item) => item.id === action.payload);
      item.qty++;
    },

    decrementCartItemQty: (state, action) => {
      let item = state.cartItems.find((item) => item.id === action.payload);
      if (item.qty === 1) {
        item.qty = 1;
      } else {
        item.qty--;
      }
    },

    removeFromCart: (state, action) => {
      let remainingItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = remainingItems;
    },
  },
});

export const {
  addToCart,
  incrementCartItemQty,
  decrementCartItemQty,
  removeFromCart,
} = CartSlice.actions;
export default CartSlice.reducer;
