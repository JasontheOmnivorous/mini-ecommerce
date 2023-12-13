import { OrderStatus, Product } from "@prisma/client";

// we dont want to add quantity as a DB column, because this is only necessary for showing how much is in the cart
export interface CartItem extends Product {
  quantity: number;
}

export interface CartSlice {
  items: CartItem[];
  isLoading: boolean;
  error: Error | null;
}

export interface OrderResponse {
  orderId: number;
  status: OrderStatus;
}

export interface BasePayload {
  onSuccess?: (data?: OrderResponse) => void;
  onError?: (data?: any) => void;
}

export interface ConfirmOrderOptions extends BasePayload {
  payload: CartItem[];
}

export interface CancelOrderOptions extends BasePayload {
  orderId: number;
}
