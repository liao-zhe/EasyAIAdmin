import request from './index'
import { SystemSetting, UpdateSettingParams } from './types'

const systemApi = {
  // 获取所有系统设置
  getSettings() {
    return request.get<SystemSetting[]>('/settings')
  },

  // 批量更新设置
  updateSettings(settings: UpdateSettingParams[]) {
    return request.put<void>('/settings', { settings })
  },

  // 获取访问统计
  getVisitStats(days = 7) {
    return request.get('/visit-stats', {
      params: { days }
    })
  },

  // 记录访问
  recordVisit() {
    return request.post('/visit-logs')
  }
}

export default systemApi
