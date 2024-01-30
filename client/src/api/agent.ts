import axios from "axios";
import { UserPayload } from "../interfaces/UserPayloadProps";

// The main url is in vite.config.ts file in proxy property
axios.defaults.baseURL = "api/v1";

const requests = {
  get: async <T>(url: string) => {
    return await axios.get<T>(url);
  },
  post: async <T>(url: string, body: {}) => {
    return await axios.post<T>(url, body);
  },
  patch: async <T>(url: string, body: {}) => {
    return await axios.patch<T>(url, body);
  },
  delete: async <T>(url: string) => {
    return await axios.delete<T>(url);
  },
};

const Auth = {
  register: async (body: {}) => {
    return await requests.post(`auth/register`, body);
  },
  login: async (body: {}) => {
    return await requests.post("auth/login", body);
  },
  logout: async () => {
    return await requests.get("auth/logout");
  },
};

const Jobs = {};

const User = {
  getCurrentUser: async () => {
    return await requests.get<UserPayload>("user/current-user");
  },
};

const agent = {
  Auth,
  Jobs,
  User,
};

export { agent };
