export type LoginResult = {
  isAuthenticated?: boolean;
  token: string;
  username: string;
  branch_id: number;
  branch_name: string;
  branch_type: string;
  phone: string;
  role: number;
  roles: string[];
  permissions: [];
};