// src/components/features/Home/Categories.tsx
import React from "react";
import { Phone, Book, Diamond, Toys, SportsBasketball, Watch, SportsEsports, Brush, Computer, Weekend } from "@mui/icons-material";

const categories = [
  { icon: <Phone />, label: "Electronics" },
  { icon: <Book />, label: "Books" },
  { icon: <Diamond />, label: "Jewelry" },
  { icon: <Toys />, label: "Toys" },
  { icon: <SportsBasketball />, label: "Sports" },
  { icon: <Watch />, label: "Watches" },
  { icon: <SportsEsports />, label: "Games" },
  { icon: <Brush />, label: "Fine arts" },
  { icon: <Computer />, label: "Software" },
  { icon: <Weekend />, label: "Furniture" },
];

export const Categories: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold mb-8">Our Top Categories</h2>
        <div className="grid grid-cols-5 gap-8">
          {categories.map((category) => (
            <div key={category.label} className="flex flex-col items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full mb-3">{category.icon}</div>
              <span className="text-sm text-gray-600">{category.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
