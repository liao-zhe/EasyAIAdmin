export { default as userApi } from './user'
export { default as authApi } from './auth'
export { default as systemApi } from './system'
export { default as uploadApi } from './upload'
export { default as thirdPartyApi } from './thirdParty'

// 统一从 types 导出所有类型
export type * from './types'

// 仅导出 auth 特有的类型
export type { LoginParams, LoginResult } from './auth'
