import React from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Box, Rating, Button } from "@mui/material";
import { FavoriteBorder, Favorite, ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/store/slices/wishlistSlice";
import { RootState } from "@/store";
import { Product, CartItem } from "@/types";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
  };

  const handleToggleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const discountedPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price;

  return (
    <Card className="relative group">
      {/* Wishlist button */}
      <IconButton className="absolute top-2 right-2 z-10 bg-white opacity-0 group-hover:opacity-100 transition-opacity" size="small" onClick={handleToggleWishlist}>
        {isInWishlist ? <Favorite color="error" /> : <FavoriteBorder />}
      </IconButton>

      {/* Product Image */}
      <CardMedia component="img" height="200" image={product.image} alt={product.name} className="h-48 object-contain p-4" />

      {/* Product Info */}
      <CardContent>
        <Typography variant="subtitle1" component="h2" className="font-medium line-clamp-2 min-h-[48px]">
          {product.name}
        </Typography>

        {product.rating !== undefined && (
          <Box className="flex items-center gap-1 my-1">
            <Rating value={product.rating} readOnly size="small" precision={0.5} />
            {product.reviews && (
              <Typography variant="body2" color="text.secondary">
                ({product.reviews})
              </Typography>
            )}
          </Box>
        )}

        <Box className="flex items-center justify-between mt-2">
          <Box>
            <Typography variant="h6" component="span" className="font-bold">
              ${discountedPrice.toFixed(2)}
            </Typography>
            {product.discount && (
              <Typography variant="body2" color="text.secondary" className="line-through ml-2">
                ${product.price.toFixed(2)}
              </Typography>
            )}
          </Box>

          <Button variant="contained" size="small" startIcon={<ShoppingCart />} onClick={handleAddToCart}>
            Thêm
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
