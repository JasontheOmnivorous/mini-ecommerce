import { MonetizationOn } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { Product } from "@prisma/client";
import Link from "next/link";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <Link style={{ textDecoration: "none" }} href={`/products/${product.id}`}>
      <Card
        sx={{
          width: 300,
          height: 300,
          m: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        elevation={3}
      >
        <img style={{ width: 100, height: 100 }} src={product.imageUrl || ""} />
        <CardContent>
          <Typography>{product.title}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MonetizationOn sx={{ fontSize: 40, color: "green" }} />
            <Typography>{product.price}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
