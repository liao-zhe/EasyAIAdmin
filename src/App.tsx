import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { App as AntdApp } from 'antd'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import 'antd/dist/reset.css'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token')
  return token ? <>{children}</> : <Navigate to="/login" />
}

const AppRouter: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AntdApp>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </Router>
      </AntdApp>
    </div>
  )
}

export default AppRouter
