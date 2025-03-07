// src/pages/Account/AccountLayout.tsx
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Paper, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { AccountCircle, ShoppingBag, Favorite, Settings } from "@mui/icons-material";

const menuItems = [
  {
    path: "/account/profile",
    label: "Thông tin tài khoản",
    icon: <AccountCircle />,
  },
  {
    path: "/account/orders",
    label: "Đơn hàng của tôi",
    icon: <ShoppingBag />,
  },
  {
    path: "/account/wishlist",
    label: "Sản phẩm yêu thích",
    icon: <Favorite />,
  },
  {
    path: "/account/settings",
    label: "Cài đặt",
    icon: <Settings />,
  },
];

export const AccountLayout: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-3">
          <Paper className="p-4">
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.path} component={NavLink} to={item.path} className={({ isActive }) => `rounded-lg mb-2 ${isActive ? "bg-primary-50 text-primary-600" : "hover:bg-gray-50"}`}>
                  <ListItemIcon className="min-w-[40px]">{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <Paper className="p-6">
            <Outlet />
          </Paper>
        </div>
      </div>
    </div>
  );
};
