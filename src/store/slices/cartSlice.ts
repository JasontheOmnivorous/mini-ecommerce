import { CartSlice, ConfirmOrderOptions } from "@/types/cart";
import { config } from "@/utils/config";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: CartSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const confirmOrder = createAsyncThunk(
  "cart/confirmOrder",
  async (options: ConfirmOrderOptions, thunkApi) => {
    const { payload, onSuccess, onError } = options;

    try {
      const response = await fetch(`${config.apiBaseUrl}/order`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const dataFromServer = await response.json();
      // call onSuccess and onError from thunk if they're passed as args
      onSuccess && onSuccess(dataFromServer);
    } catch (err) {
      onError && onError(err);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // search if the product added to cart exists
      const existingId = state.items.find(
        (item) => item.id === action.payload.id
      );

      // if it exists, find it and increment it's quantity
      if (existingId) {
        state.items = state.items.map((item) =>
          item.id === existingId.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.items = [...state.items, action.payload];
      }
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
