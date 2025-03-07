import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { HomePage } from "@/pages/Home";
import { LoginPage } from "@/pages/Auth/Login";
import { ProductsPage } from "@/pages/Products";
import { ProductDetailPage } from "@/pages/Products/[id]";
import { CartPage } from "@/pages/Cart";
import { AccountLayout } from "@/pages/Account/AccountLayout";
import { ProfilePage } from "@/pages/Account/Profile";
import { OrdersPage } from "@/pages/Account/Orders";
import { WishlistPage } from "@/pages/Account/Wishlist";
import { CheckoutPage } from "@/pages/Checkout";
import { ProtectedRoute } from "@/components/features/Auth/ProtectedRoute";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/register" element={<RegisterPage />} /> */}

      {/* Protected Routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      {/* Protected Account Routes */}
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountLayout />
          </ProtectedRoute>
        }
      >
        <Route path="profile" element={<ProfilePage />} />
        <Route path="orders" element={<OrdersPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
