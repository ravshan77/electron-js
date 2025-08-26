import { LoginResult } from "@/pages/authentication/types";
import { apiRequest } from "./api/api";
import { Response } from "@/types/type";

export const authApi = {
  login: (payload: { phone: string, password: string, otp: string | null }) => apiRequest<Response<LoginResult>>("POST", `/auth/login`, payload),
  me: () => apiRequest<Response<LoginResult>>("GET", `/auth/me`),
  logout: () => apiRequest<Response<any>>("GET", `/auth/logout`),
};

