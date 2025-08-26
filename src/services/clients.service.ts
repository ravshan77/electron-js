import { apiRequest } from "./api/api";
import { ResponseWithPagination } from "@/types/type";
import { ClientsType } from "@/pages/informations/clients/types";

export const clientsApi = {
  getAll: (payload: { page: number, client_name: string }) => apiRequest<ResponseWithPagination<ClientsType>>("POST", `/clients?page=${payload.page}`, { client_name: payload?.client_name }),
};

