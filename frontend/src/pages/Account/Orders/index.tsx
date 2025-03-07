import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Button } from "@mui/material";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { LoadingSpinner } from "@/components/common/Loading";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: number;
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    date: "2024-01-15",
    total: 299.99,
    status: "delivered",
    items: 3,
  },
];

export const OrdersPage: React.FC = () => {
  const { isAuthenticated, loading } = useRequireAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  const getStatusColor = (status: Order["status"]): "warning" | "info" | "primary" | "success" | "error" => {
    const colors = {
      pending: "warning",
      processing: "info",
      shipped: "primary",
      delivered: "success",
      cancelled: "error",
    } as const;
    return colors[status];
  };

  const getStatusLabel = (status: Order["status"]) => {
    const labels = {
      pending: "Chờ xác nhận",
      processing: "Đang xử lý",
      shipped: "Đang giao",
      delivered: "Đã giao",
      cancelled: "Đã hủy",
    };
    return labels[status];
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Đơn hàng của tôi</h1>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Mã đơn hàng</TableCell>
              <TableCell>Ngày đặt</TableCell>
              <TableCell>Số lượng</TableCell>
              <TableCell>Tổng tiền</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell align="right">Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{new Date(order.date).toLocaleDateString("vi-VN")}</TableCell>
                <TableCell>{order.items} sản phẩm</TableCell>
                <TableCell>{order.total.toLocaleString("vi-VN")}đ</TableCell>
                <TableCell>
                  <Chip label={getStatusLabel(order.status)} color={getStatusColor(order.status)} size="small" />
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" size="small">
                    Chi tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
