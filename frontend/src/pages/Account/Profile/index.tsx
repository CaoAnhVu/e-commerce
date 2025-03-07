// src/pages/Account/Profile/index.tsx
import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Avatar, Grid, IconButton } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { LoadingSpinner } from "@/components/common/Loading";
import { useAuth } from "@/hooks/useAuth";

interface ProfileFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

export const ProfilePage: React.FC = () => {
  const { isAuthenticated, loading } = useRequireAuth();
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      fullName: user?.fullName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    },
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const onSubmit = (data: ProfileFormData) => {
    console.log(data);
    // Xử lý cập nhật thông tin profile
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Thông tin tài khoản</h1>

      <div className="mb-8 flex items-center">
        <Avatar src={user?.avatar} alt={user?.fullName} className="w-24 h-24" />
        <IconButton color="primary" aria-label="upload picture" component="label" className="ml-4">
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Họ và tên"
              error={!!errors.fullName}
              helperText={errors.fullName?.message}
              {...register("fullName", {
                required: "Họ và tên là bắt buộc",
              })}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Email" disabled {...register("email")} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Số điện thoại"
              error={!!errors.phone}
              helperText={errors.phone?.message}
              {...register("phone", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Địa chỉ" multiline rows={3} error={!!errors.address} helperText={errors.address?.message} {...register("address")} />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Cập nhật thông tin
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
