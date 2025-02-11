import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authApi } from '../api/apis'
import type { LoginParams, LoginResponse } from '../api/auth'
import './Login.css'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogin = async (values: LoginParams) => {
    setLoading(true)
    try {
      const res = (await authApi.login(values)) as LoginResponse
      if (res.code === 0) {
        localStorage.setItem('token', res.data.token)
        message.success(res.message)
        navigate('/dashboard')
      } else {
        message.error(res.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-container">
      <Card className="login-card" bordered={false}>
        <h2 className="login-title">系统登录</h2>
        <Form
          name="login"
          onFinish={handleLogin}
          autoComplete="off"
          size="large"
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名！' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码！' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              登录
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" block onClick={() => navigate('/register')}>
              没有账号？去注册
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Login
