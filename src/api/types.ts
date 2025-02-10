// 基础响应类型
export interface BaseResponse<T = any> {
  code: number
  data: T
  message: string
}

// 分页参数类型
export interface PageParams {
  page: number
  pageSize: number
}

// 分页响应类型
export interface PageResult<T> {
  list: T[]
  total: number
}

// 时间统计类型
export interface TimeStats {
  date: string
  count: number
}

// 用户相关类型
export interface UserInfo {
  id: number
  username: string
  role: 'admin' | 'user'
  status: 0 | 1
  created_at: string
}

// 系统设置相关类型
export interface SystemSetting {
  id: number
  setting_key: string
  setting_value: string
  updated_at: string
}

export interface UpdateSettingParams {
  key: string
  value: string
}

// 第三方API相关类型
export interface WeatherData {
  temperature: number
  humidity: number
  description: string
}
