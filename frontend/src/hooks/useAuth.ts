// src/hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { logout } from "@/store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    logout: handleLogout,
  };
};
