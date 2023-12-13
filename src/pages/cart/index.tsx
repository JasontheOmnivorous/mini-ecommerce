import ProductCard from "@/components/product/ProductCard";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { confirmOrder, updateQuantity } from "@/store/slices/cartSlice";
import { OrderResponse } from "@/types/cart";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const CartPage = () => {
  const cartItems = useAppSelector((store) => store.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const getCartTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => (totalPrice += item.price * item.quantity));
    return totalPrice;
  };

  const increaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity })); // pass current item's id and it's quantity as payload
  };

  const decreaseQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  // define onSuccess and onError
  const onSuccess = (data?: OrderResponse) => {
    // redirect here because at this point, the data fetching process is completed since this func is called after that
    router.push(
      `/confirmation?orderId=${data?.orderId}&status=${data?.status}`
    ); // construct query string
  };

  const onError = (data: any) => {};

  const handleConfirmOrder = () => {
    dispatch(confirmOrder({ payload: cartItems, onSuccess, onError }));
    // we cant router.push here because it wont wait the response of confirm order and we want that responded data
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {cartItems.length ? (
        <Box>
          {cartItems.map((item) => (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={item.id}
            >
              <ProductCard product={item} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    mr: 5,
                    p: 0,
                  }}
                  onClick={() => increaseQuantity(item.id, item.quantity + 1)}
                >
                  <AddCircle sx={{ fontSize: 30, color: "green" }} />
                </Button>
                <Typography sx={{ mr: 5, fontWeight: "bold" }}>
                  {item.quantity}
                </Typography>
                <Button
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    mr: 5,
                    p: 0,
                  }}
                  onClick={() => decreaseQuantity(item.id, item.quantity - 1)}
                >
                  <RemoveCircle
                    sx={{ fontSize: 30, mr: 5, color: "crimson" }}
                  />
                </Button>
              </Box>
            </Box>
          ))}
          <Typography sx={{ m: 5 }} variant="h5">
            Total Price: {getCartTotalPrice()}
          </Typography>
          <Button
            sx={{ m: 5 }}
            variant="contained"
            onClick={handleConfirmOrder}
          >
            confirm order
          </Button>
        </Box>
      ) : (
        <Typography variant="h3">Cart is empty...</Typography>
      )}
    </Box>
  );
};

export default CartPage;
