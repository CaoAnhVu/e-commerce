import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, TextField, Button, InputAdornment, Alert, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Visibility, VisibilityOff, Google as GoogleIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { login } from "@/store/slices/authSlice";

const StyledPaper = styled(Paper)(({ theme }) => ({
  "& .MuiTextField-root": {
    marginBottom: theme.spacing(2),
  },
  "& .MuiButton-root": {
    marginTop: theme.spacing(2),
  },
}));

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate("/");
    } catch (error: any) {
      setError("email", {
        type: "manual",
        message: error.message || "Đăng nhập thất bại",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 py-10">
      <div className="w-[400px]">
        <StyledPaper elevation={3} className="w-full bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center mb-4">
            <div className="w-10 h-10 mb-3">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>

            <Typography variant="h6" component="h1" className="text-center font-bold text-gray-900">
              Đăng nhập vào tài khoản
            </Typography>
          </div>

          {error && (
            <Alert severity="error" className="mb-3">
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <TextField
              fullWidth
              size="small"
              label="Email"
              variant="outlined"
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
              size="small"
              label="Mật khẩu"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              error={!!errors.password}
              helperText={errors.password?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
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

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-xs text-blue-600 hover:text-blue-800">
                Quên mật khẩu?
              </Link>
            </div>

            <Button type="submit" fullWidth variant="contained" size="large" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md">
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Đang xử lý...
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Hoặc tiếp tục với</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button fullWidth variant="outlined" startIcon={<GoogleIcon />} className="normal-case text-gray-700 hover:bg-gray-50">
                Google
              </Button>

              <Button fullWidth variant="outlined" startIcon={<FacebookIcon />} className="normal-case text-gray-700 hover:bg-gray-50">
                Facebook
              </Button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Typography variant="body2" className="text-gray-600">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-blue-600 hover:text-blue-800 font-medium">
                Đăng ký ngay
              </Link>
            </Typography>
          </div>
        </StyledPaper>
      </div>
    </div>
  );
};
