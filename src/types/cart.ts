import { Product } from "@prisma/client";

// we dont want to add quantity as a DB column, because this is only necessary for showing how much is in the cart
export interface CartItem extends Product {
  quantity: number;
}

export interface CartSlice {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}
