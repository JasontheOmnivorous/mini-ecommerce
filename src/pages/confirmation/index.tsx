import { useAppDispatch } from "@/store/hooks";
import { cancelOrder } from "@/store/slices/cartSlice";
import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

const ConfirmationPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { orderId, status } = router.query; // get id and status from query string
  const dispatch = useAppDispatch();

  const onSuccess = () => {
    setOpen(true);
    // wait some time for the user to see snackbar
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  const onError = () => {};

  const handleCancelOrder = () => {
    dispatch(cancelOrder({ orderId: Number(orderId), onSuccess, onError }));
  };

  return (
    <Box
      sx={{
        with: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        m: 2,
      }}
    >
      <Typography variant="h4" sx={{ m: 2 }}>
        Order id: {orderId}
      </Typography>
      <Typography variant="h4" sx={{ m: 2 }}>
        Status: {status}
      </Typography>
      <Box sx={{ m: 2 }}>
        <Button onClick={handleCancelOrder} variant="contained">
          cancel order
        </Button>
      </Box>
      {open && (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Alert
            onClose={() => setOpen(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Order Cancelled successfully!
          </Alert>
        </Snackbar>
      )}
    </Box>
  );
};

export default ConfirmationPage;
