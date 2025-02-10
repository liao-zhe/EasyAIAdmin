import { WHITE_LIST } from './constants'
import type { RouteConfig } from './types'

// 检查路由是否需要权限
export const checkAuth = (path: string) => {
  return !WHITE_LIST.includes(path)
}

// 获取第一个可访问的路由
export const getFirstRoute = (routes: RouteConfig[]): string => {
  const route = routes.find(route => !route.meta?.hideInMenu)
  return route ? route.path : '/'
}
