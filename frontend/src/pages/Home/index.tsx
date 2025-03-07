import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { ProductCard } from "@/components/product/ProductCard";

const mockProducts = [
  {
    id: "1",
    name: "Sản phẩm mẫu 1",
    price: 99.99,
    image: "https://via.placeholder.com/200",
    rating: 4.5,
    reviews: 123,
    discount: 10,
  },
  // Thêm các sản phẩm mẫu khác
];

export const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="h1" className="mb-6">
        Sản phẩm nổi bật
      </Typography>

      <Grid container spacing={3}>
        {mockProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
