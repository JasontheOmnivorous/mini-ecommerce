import ProductCard from "@/components/product/ProductCard";
import SearchBar from "@/components/search/SearchBar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/slices/productSlice";
import { ShoppingCart } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import { useEffect, useState } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((store) => store.product.items);
  const cartItems = useAppSelector((store) => store.cart.items);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // change the state when the products slice is populated with data
  useEffect(() => {
    if (products.length) setFilteredProducts(products); // if the products has data, update the state
  }, [products]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100vw",
        }}
      >
        <SearchBar
          products={products}
          setFilteredProducts={setFilteredProducts}
        />
        <Box>
          {cartItems.length > 0 && (
            <Typography
              sx={{
                bgcolor: "crimson",
                borderRadius: "50%",
                width: 20,
                height: 20,
                color: "white",
                textAlign: "center",
              }}
            >
              {cartItems.length}
            </Typography>
          )}
          <ShoppingCart sx={{ fontSize: 50, mr: 10, color: "crimson" }} />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
}
