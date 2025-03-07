// src/components/features/Home/HeroBanner.tsx
import React from "react";
import { Button } from "@mui/material";

export const HeroBanner: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-[#FF4B6E] to-[#FFA646] rounded-lg overflow-hidden">
      <div className="container mx-auto py-16 px-8">
        <div className="flex items-center">
          <div className="w-1/2">
            <h1 className="text-white text-5xl font-bold mb-4">New Year Sale</h1>
            <h2 className="text-white text-4xl mb-6">Offer 2024</h2>
            <p className="text-white text-3xl font-bold mb-8">20% OFF</p>
            <Button variant="contained" color="secondary" size="large" className="bg-white text-primary-600 hover:bg-gray-100">
              Start Shopping
            </Button>
          </div>
          <div className="w-1/2">
            <img src="/banner-watch.png" alt="Apple Watch" className="w-full object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
};
