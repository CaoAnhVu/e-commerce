// src/hooks/useRequireAuth.ts
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export const useRequireAuth = (redirectUrl = "/login") => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate(redirectUrl, {
        state: { from: location.pathname },
      });
    }
  }, [isAuthenticated, loading, navigate, redirectUrl, location]);

  return { isAuthenticated, loading };
};
