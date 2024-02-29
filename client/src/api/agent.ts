import axios from "axios";
import { UserPayload } from "../interfaces/UserPayloadProps";
import { JobPostProps } from "../interfaces/JobPostProps";
import { JobsProps } from "../interfaces/JobsProps";
import { ServerJobResponse } from "../interfaces/ServerJobResponse";
import { AppStatsProps } from "../interfaces/AppStatsProps";

// The main url is in vite.config.ts file in proxy property
axios.defaults.baseURL = "/api/v1";

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

const Jobs = {
  createJob: async (body: {}) => {
    return await requests.post<JobPostProps>("jobs", body);
  },
  getAllJobs: async () => {
    return await requests.get<JobsProps>("jobs");
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
};

const agent = {
  Auth,
  Jobs,
  User,
};

export { agent };
