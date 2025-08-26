
// export interface IStateAuth {
//   isAuthenticated: boolean
//   authInfo?: {
//     token: string
//     user: LoginResoult
//   }
// }

import { LoginResult } from "@/types/type"


export type IActionAuth = IActionLogin | IActionLogout

export interface IActionLogin {
  type: 'login',
  payload: LoginResult
}

export interface IAuthPayload {
  token: string
  user: LoginResult
}

export interface IActionLogout {
  type: 'logout'
}
