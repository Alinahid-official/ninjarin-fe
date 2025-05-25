import { API_BASE, API_VER } from "@/config/config";

export default {
  USERS: `${API_BASE}/users`,
  USER: `${API_BASE}/users/:userId`,
  USER_LOGIN: `${API_BASE}/auth/login`,
  USER_RESET_PASSWORD: `${API_BASE}/auth/reset-password`,
  PROJECTS: `${API_BASE}/projects`,
  CUSTOMERS: `${API_BASE}/customers`,
  INVENTORIES: `${API_BASE}/inventories`,
  ADMIN_INVENTORIES: `${API_BASE}/admin-inventories`,
};
