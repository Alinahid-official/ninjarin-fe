import { API_BASE, API_VER } from "@/config/config";

export default {
  USERS: `${API_BASE}/${API_VER}/users`,
  USER: `${API_BASE}/${API_VER}/users/:userId`,
  USER_LOGIN: `${API_BASE}/auth/login`,
  PROJECTS: `${API_BASE}/projects`,
};
