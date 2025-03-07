// src/pages/Account/Wishlist/index.tsx
import React from "react";
import { Grid, Button } from "@mui/material";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { LoadingSpinner } from "@/components/common/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ProductCard } from "@/components/product/ProductCard";

export const WishlistPage: React.FC = () => {
  const { isAuthenticated, loading } = useRequireAuth();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sản phẩm yêu thích</h1>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Bạn chưa có sản phẩm nào trong danh sách yêu thích</p>
          <Button variant="contained" color="primary" href="/products">
            Khám phá sản phẩm
          </Button>
        </div>
      ) : (
        <Grid container spacing={3}>
          {wishlistItems.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
