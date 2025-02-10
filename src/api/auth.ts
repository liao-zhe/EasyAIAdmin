import request from './index'
import type { BaseResponse } from './types'

export interface LoginParams {
  username: string
  password: string
}

export interface LoginResult {
  token: string
  user: {
    id: number
    username: string
    role: string
  }
}

// 登录响应类型
export type LoginResponse = BaseResponse<LoginResult>

const authApi = {
  // 登录
  login(data: LoginParams) {
    return request.post<LoginResponse>('/auth/login', data)
  },

  // 注册
  register(data: LoginParams) {
    return request.post<BaseResponse<null>>('/auth/register', data)
  },

  // 退出登录
  logout() {
    return request.post<BaseResponse<null>>('/auth/logout')
  },

  // 获取用户信息
  getUserInfo() {
    return request.get<BaseResponse<LoginResult>>('/auth/userinfo')
  }
}

export default authApi
