// src/components/layout/Navigation/Navigation.tsx
import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Today's Deals", path: "/deals" },
  { label: "Customer Services", path: "/services" },
  { label: "Trending Products", path: "/trending" },
  { label: "Blog", path: "/blog" },
  { label: "Special Offers", path: "/offers" },
];

export const Navigation: React.FC = () => {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto">
        <ul className="flex items-center space-x-8 py-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="text-gray-600 hover:text-primary-600 transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
