// src/components/product/ProductCard/ProductCard.tsx
import React from "react";
import { IconButton, Rating } from "@mui/material";
import { FavoriteBorder, Add } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    image: string;
    price: number;
    rating: number;
    reviews: number;
  };
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 relative group">
      {/* Wishlist button */}
      <IconButton className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" size="small">
        <FavoriteBorder />
      </IconButton>

      {/* Product Image */}
      <div className="aspect-square mb-4">
        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-800">{product.name}</h3>

        <div className="flex items-center space-x-1">
          <Rating value={product.rating} readOnly size="small" />
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">${product.price}</span>
          <IconButton size="small" color="primary" onClick={() => dispatch(addToCart(product))}>
            <Add />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
