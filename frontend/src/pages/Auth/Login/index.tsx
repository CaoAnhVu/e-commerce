import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Typography, TextField, Button, InputAdornment, Alert, IconButton } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { Visibility, VisibilityOff, Google as GoogleIcon, Facebook as FacebookIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { login } from "@/store/slices/authSlice";

const StyledPaper = styled(Paper)(() => ({
  backdropFilter: "blur(10px)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
}));

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useTheme();
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
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="w-[380px] bg-white shadow-md rounded-lg p-6">
        <StyledPaper
          elevation={3}
          sx={{
            width: "100%",
            maxWidth: "380px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 2,
            px: 3,
            py: 2.5,
            border: "1px solid",
            borderColor: "grey.100",
            margin: "0 auto",
            "& .MuiTextField-root": {
              mb: 2,
            },
          }}
        >
          {/* Logo và Tiêu đề */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-10 h-10 mb-4 p-2.5 rounded-full" style={{ backgroundColor: theme.palette.primary.light }}>
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>

            <Typography
              variant="h6"
              sx={{
                color: theme.palette.secondary.main,
                fontWeight: 600,
                fontSize: "1rem",
                mb: 1,
              }}
            >
              Đăng nhập vào tài khoản
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.75rem" }}>
              Chào mừng bạn trở lại!
            </Typography>
          </div>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 1 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  bgcolor: "background.paper",
                },
              }}
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
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 1,
                  bgcolor: "background.paper",
                },
              }}
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

            <div className="flex justify-end mb-4">
              <Link to="/forgot-password" style={{ color: theme.palette.primary.main }} className="text-sm hover:underline">
                Quên mật khẩu?
              </Link>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{
                bgcolor: theme.palette.primary.main,
                color: "white",
                py: 1,
                borderRadius: 1,
                textTransform: "none",
                "&:hover": {
                  bgcolor: theme.palette.primary.dark,
                },
              }}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white/60 border-t-transparent rounded-full animate-spin mr-2"></div>
                  <span>Đang xử lý...</span>
                </div>
              ) : (
                "Đăng nhập"
              )}
            </Button>
          </form>

          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">hoặc tiếp tục với</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<GoogleIcon />}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: theme.palette.primary.dark,
                    bgcolor: "rgba(255, 75, 110, 0.04)",
                  },
                }}
              >
                Google
              </Button>

              <Button
                fullWidth
                variant="outlined"
                size="small"
                startIcon={<FacebookIcon />}
                sx={{
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  textTransform: "none",
                  "&:hover": {
                    borderColor: theme.palette.primary.dark,
                    bgcolor: "rgba(255, 75, 110, 0.04)",
                  },
                }}
              >
                Facebook
              </Button>
            </div>
          </div>

          <Typography variant="body2" align="center" sx={{ color: "text.secondary" }}>
            Chưa có tài khoản?{" "}
            <Link to="/register" style={{ color: theme.palette.primary.main }} className="font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </Typography>
        </StyledPaper>
      </div>
    </div>
  );
};
