import { Product } from "@prisma/client"; // extract product schema type with prisma client

export interface ProductSlice {
  items: Product[];
  isLoading: boolean;
  error: Error | null;
}
