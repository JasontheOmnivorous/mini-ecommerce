import { CartSlice } from "@/types/cart";
import { createSlice } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  items: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload]; // push the payloads inside items array
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
