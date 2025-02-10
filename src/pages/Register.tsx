import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { authApi } from '../api/apis'
import type { LoginParams } from '../api/auth'
import type { BaseResponse } from '../api/types'
import './Login.css'

const Register: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleRegister = async (values: LoginParams) => {
    setLoading(true)
    try {
      const res = (await authApi.register(values)) as BaseResponse<null>
      if (res.code === 0) {
        message.success(res.message)
        navigate('/login')
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
        <h2 className="login-title">用户注册</h2>
        <Form
          name="register"
          onFinish={handleRegister}
          autoComplete="off"
          size="large"
          className="login-form"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名！' },
              { min: 3, message: '用户名至少3个字符！' }
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码至少6个字符！' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              注册
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" block onClick={() => navigate('/login')}>
              已有账号？去登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Register
