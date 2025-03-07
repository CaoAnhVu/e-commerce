// src/components/layout/Header/Header.tsx
import React from "react";
import { AppBar, Toolbar, IconButton, Badge, InputBase, Menu, MenuItem, Avatar } from "@mui/material";
import { Search as SearchIcon, ShoppingCart, FavoriteBorder, Person, ExitToApp, AccountCircle, ShoppingBag } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "@/store";
import { AuthModal } from "@/components/features/Auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // State cho AuthModal
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  // State cho User Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleUserMenuClose();
  };

  const handleProfileClick = () => {
    navigate("/account/profile");
    handleUserMenuClose();
  };

  const handleOrdersClick = () => {
    navigate("/account/orders");
    handleUserMenuClose();
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar className="container mx-auto">
        {/* Logo */}
        <div className="flex-1">
          <img src="/logo.png" alt="LOGOHERE" className="h-8 cursor-pointer" onClick={() => navigate("/")} />
        </div>

        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 mx-4 flex-1">
          <InputBase placeholder="Search Products..." className="flex-1 ml-2" />
          <IconButton size="small">
            <SearchIcon />
          </IconButton>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <IconButton>
            <FavoriteBorder />
          </IconButton>

          <IconButton onClick={() => navigate("/cart")}>
            <Badge badgeContent={cartItems.length} color="primary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <IconButton onClick={handleUserMenuOpen}>{user?.avatar ? <Avatar src={user.avatar} alt={user.fullName} className="w-8 h-8" /> : <AccountCircle />}</IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleUserMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <AccountCircle className="mr-2" /> Tài khoản
                </MenuItem>
                <MenuItem onClick={handleOrdersClick}>
                  <ShoppingBag className="mr-2" /> Đơn hàng
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ExitToApp className="mr-2" /> Đăng xuất
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton onClick={() => setAuthModalOpen(true)}>
              <Person />
            </IconButton>
          )}
        </div>
      </Toolbar>

      {/* Auth Modal */}
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </AppBar>
  );
};
