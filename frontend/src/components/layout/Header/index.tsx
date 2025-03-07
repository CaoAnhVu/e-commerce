import React from "react";
import { AppBar, Toolbar, IconButton, Badge, InputBase, Menu, MenuItem, Avatar, ListItemIcon, ListItemText } from "@mui/material";
import { Search as SearchIcon, ShoppingCart, FavoriteBorder, Person, AccountCircle, Logout as LogoutIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate("/");
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar className="container mx-auto">
        <div className="flex-1">
          <img src="/logo.png" alt="Logo" className="h-8 cursor-pointer" onClick={() => navigate("/")} />
        </div>

        <div className="flex-1 mx-4">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
            <InputBase placeholder="Tìm kiếm sản phẩm..." className="flex-1 ml-2" />
            <IconButton size="small">
              <SearchIcon />
            </IconButton>
          </div>
        </div>

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
              <IconButton onClick={handleMenuOpen}>{user?.avatar ? <Avatar src={user.avatar} alt={user.fullName} className="w-8 h-8" /> : <AccountCircle />}</IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem
                  onClick={() => {
                    navigate("/account/profile");
                    handleMenuClose();
                  }}
                >
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Tài khoản</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Đăng xuất</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <IconButton onClick={() => navigate("/login")}>
              <Person />
            </IconButton>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
