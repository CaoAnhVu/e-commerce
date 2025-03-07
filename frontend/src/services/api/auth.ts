// src/services/api/auth.ts
import axios from "axios";
import { LoginCredentials, RegisterCredentials } from "@/types/auth";

const API_URL = "your-api-url/auth";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  register: async (credentials: RegisterCredentials) => {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  },
};
