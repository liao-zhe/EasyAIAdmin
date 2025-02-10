import request from './index'
import type {
  PageParams,
  PageResult,
  TimeStats,
  UserInfo,
  BaseResponse
} from './types'

const baseUrl = '/users'

const userApi = {
  // 获取用户列表
  getList(params: PageParams): Promise<BaseResponse<PageResult<UserInfo>>> {
    return request.get(`${baseUrl}/list`, { params })
  },

  // 获取用户增长统计
  getGrowthStats(days = 30) {
    return request.get<TimeStats[]>(`${baseUrl}/growth`, {
      params: { days }
    })
  },

  // 更新用户状态
  updateStatus(id: number, status: 0 | 1): Promise<BaseResponse<null>> {
    return request.put(`${baseUrl}/${id}/status`, { status })
  },

  // 删除用户
  delete(id: number): Promise<BaseResponse<null>> {
    return request.delete(`${baseUrl}/${id}`)
  },

  // 更新用户角色
  updateRole(id: number, role: 'admin' | 'user'): Promise<BaseResponse<null>> {
    return request.put(`${baseUrl}/${id}/role`, { role })
  }
}

export default userApi
