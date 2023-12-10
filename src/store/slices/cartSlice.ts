import { CartItem, CartSlice } from "@/types/cart";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const confirmOrder = createAsyncThunk(
  "cartSlice/confirmOrder",
  async (payload: CartItem[], thunkApi) => {
    const response = await fetch(`${config.apiBaseUrl}/order`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items = [...state.items, action.payload]; // push the payloads inside items array
    },
    updateQuantity: (state, action) => {
      const actionQuantity = action.payload.quantity;

      // if actionQuantity is 0, filter out that product
      if (!actionQuantity) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        // search the product with id, update the quantity with payload and update items with that mutated data
        state.items = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
      }
    },
  },
});

export const { addToCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
