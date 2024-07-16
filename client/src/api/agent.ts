import axios from "axios";
import {
  JobPostProps,
  JobProps,
  ServerJobResponse,
  UserPayload,
  AppStatsProps,
  PaginationProps,
} from "../interfaces";
import { UpdateUserPasswordProps } from "../interfaces/UpdateUserPasswordProps";

// The main url is in vite.config.ts file in proxy property
axios.defaults.baseURL = "/api/v1";

const requests = {
  get: async <T>(url: string, params?: {}) => {
    return await axios.get<T>(url, { params });
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
    return await requests.delete("auth/logout");
  },
  verifyEmail: async (body: {}) => {
    return await requests.post(`auth/verify-email`, body);
  },
};

const Jobs = {
  createJob: async (body: {}) => {
    return await requests.post<JobPostProps>("jobs", body);
  },
  getAllJobs: async (params?: {}) => {
    return await requests.get<PaginationProps<JobProps[]>>("jobs", params);
  },
  updateJob: async (id: string, body: {}) => {
    return await requests.patch<JobPostProps>(`jobs/${id}`, body);
  },
  getJob: async (id: string) => {
    return await requests.get<ServerJobResponse>(`/jobs/${id}`);
  },
  deleteJob: async (id: string) => {
    return await requests.delete(`/jobs/${id}`);
  },
  getJobStats: async () => {
    return await requests.get("/jobs/stats");
  },
};

const User = {
  getCurrentUser: async () => {
    return await requests.get<UserPayload>("user/current-user");
  },
  getAdminStats: async () => {
    return await requests.get<AppStatsProps>("user/admin/app-stats");
  },
  updateUser: async (body: FormData) => {
    return await requests.patch<UserPayload>("user/update-user", body);
  },
  deleteProfileImage: async () => {
    return await requests.delete("user/delete-profile-image");
  },
  updateUserPassword: async (body: {}) => {
    return await requests.patch<UpdateUserPasswordProps>(
      `user/update-user-password`,
      body
    );
  },
};

const agent = {
  Auth,
  Jobs,
  User,
};

export { agent };
