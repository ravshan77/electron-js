import { BranchType } from "@/pages/informations/branches/types";
import { apiRequest } from "./api/api";
import { Response } from "@/types/type";

export const branchesApi = {
  getAll: (payload: { page: number, branch_name: string }) => apiRequest<Response<BranchType[]>>("POST", `/branches?page=${payload.page}`, { branch_name: payload?.branch_name }),
};

