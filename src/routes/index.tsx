import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import {
  DashboardOutlined,
  UserOutlined,
  SettingOutlined
} from '@ant-design/icons'

const Login = lazy(() => import('../pages/Login'))
const Register = lazy(() => import('../pages/Register'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const NotFound = lazy(() => import('../pages/NotFound'))

// 路由守卫组件
const AuthRoute = (props: { children: JSX.Element }) => {
  const token = localStorage.getItem('token')
  return token ? props.children : <Navigate to="/login" />
}

export const menuItems = [
  {
    key: 'dashboard',
    icon: <DashboardOutlined />,
    label: '仪表盘'
  },
  {
    key: 'users',
    icon: <UserOutlined />,
    label: '用户管理'
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: '系统设置'
  }
]

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/dashboard',
    element: (
      <AuthRoute>
        <Dashboard />
      </AuthRoute>
    )
  },
  {
    path: '/',
    element: <Navigate to="/dashboard" />
  },
  {
    path: '*',
    element: <NotFound />
  }
]
