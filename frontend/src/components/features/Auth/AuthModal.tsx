// src/components/features/Auth/AuthModal.tsx
import React from "react";
import { Dialog, DialogContent, Tabs, Tab, Box } from "@mui/material";
import { LoginForm } from "./Login/LoginForm";
import { RegisterForm } from "./Register/RegisterForm";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
  const [tab, setTab] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent className="p-6">
        <Tabs value={tab} onChange={handleTabChange} centered className="mb-6">
          <Tab label="Đăng nhập" />
          <Tab label="Đăng ký" />
        </Tabs>

        <Box hidden={tab !== 0}>
          <LoginForm />
        </Box>

        <Box hidden={tab !== 1}>
          <RegisterForm />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
