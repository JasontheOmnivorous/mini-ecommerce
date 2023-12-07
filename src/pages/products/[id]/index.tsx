import { useAppSelector } from "@/store/hooks";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useRouter } from "next/router";

const ProductPage = () => {
  const id = useRouter().query.id;
  const products = useAppSelector((store) => store.product.items);
  const filteredProduct = products.find((product) => product.id === Number(id));

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Card
        sx={{
          width: 800,
          height: 600,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
        elevation={3}
      >
        <CardContent>
          <Typography sx={{ fontWeight: "bold", m: 2 }} variant="h5">
            {filteredProduct?.title}
          </Typography>
          <img
            style={{ width: 300, height: 300, margin: 2 }}
            src={filteredProduct?.imageUrl || ""}
            alt="product-image"
          />
          <Typography sx={{ m: 2 }}>{filteredProduct?.description}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductPage;
