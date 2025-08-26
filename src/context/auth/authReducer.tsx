import { LoginResult } from '@/types/type'
import { IActionAuth } from './authTypes'

const user_storage =  sessionStorage.getItem('auth')
export const user_info = user_storage ? JSON.parse(user_storage) : {}

export const role_list = [
 {
   role_name: "HR",
   role_id: "1",  
 },
 {
  role_name: "Manager",
  role_id: "2",  
 },
 {
  role_name: "Supper Admin",
  role_id: "4",  
 },
 {
  role_name: "HR yordamchisi",
  role_id: "5",  
 },
 {
  role_name: "Test qo'shuvchi",
  role_id: "6",  
 },
]

export const role_info = (roles: string[]) => {
  // const found_roles = role_list.filter(rl => roles.includes(rl.role_id))
  const found_roles = roles.map(rl => rl).join(', ')
  return found_roles
}


export const initialState: LoginResult = {
  isAuthenticated: false,
  token: "",
  username: "",
  branch_id: 0,
  branch_name: "",
  branch_type: "",
  phone: "",
  role: 0,
  roles: [],
  permissions: [],
  ...user_info,
}

export const reducer = (state: LoginResult, action: IActionAuth): LoginResult => {
  switch (action.type) {
    case 'login':
      return {
        ...action.payload,
        isAuthenticated: !!action?.payload?.token,
      }
    case 'logout':
      sessionStorage.clear()
      console.log('User logged out');
      return {
        ...initialState,
        isAuthenticated: false,
      }
    default:
      return state
  }
}
