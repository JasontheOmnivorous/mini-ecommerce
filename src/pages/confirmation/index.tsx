import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ConfirmationPage = () => {
  const router = useRouter();
  const { orderId, status } = router.query; // get id and status from query string

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
        <Button variant="contained">cancel order</Button>
      </Box>
    </Box>
  );
};

export default ConfirmationPage;
