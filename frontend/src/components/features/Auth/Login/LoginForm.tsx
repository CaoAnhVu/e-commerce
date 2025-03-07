// src/components/features/Auth/Login/LoginForm.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, CircularProgress, Alert, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { login } from "@/store/slices/authSlice";
import { RootState } from "@/store";
import { LoginCredentials } from "@/types/auth";

export const LoginForm: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginCredentials>();

  const onSubmit = (data: LoginCredentials) => {
    dispatch(login(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-6">Đăng nhập</h2>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email", {
          required: "Email là bắt buộc",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email không hợp lệ",
          },
        })}
      />

      <TextField
        fullWidth
        label="Mật khẩu"
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        {...register("password", {
          required: "Mật khẩu là bắt buộc",
          minLength: {
            value: 6,
            message: "Mật khẩu phải có ít nhất 6 ký tự",
          },
        })}
      />

      <Button type="submit" variant="contained" fullWidth size="large" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Đăng nhập"}
      </Button>
    </form>
  );
};
