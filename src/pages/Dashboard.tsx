import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import {
  Layout,
  Menu,
  Button,
  Card,
  Row,
  Col,
  Table,
  Tag,
  Switch,
  Input,
  Select
} from 'antd'
import './Dashboard.css'
import VisitChart from '../components/Charts/VisitChart'
import UserGrowthChart from '../components/Charts/UserGrowthChart'

const { Header, Sider, Content } = Layout

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const handleLogout = (): void => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // 用户列表数据
  const userColumns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'blue' : 'green'}>
          {role.toUpperCase()}
        </Tag>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => <Switch checked={status} size="small" />
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link" size="small">
          编辑
        </Button>
      )
    }
  ]

  const userData = [
    {
      key: '1',
      username: 'admin',
      role: 'admin',
      status: true
    },
    {
      key: '2',
      username: 'user1',
      role: 'user',
      status: true
    },
    {
      key: '3',
      username: 'user2',
      role: 'user',
      status: false
    }
  ]

  // 系统设置选项
  const settingsContent = (
    <div className="settings-container">
      <Card title="基本设置" className="settings-card">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div className="setting-item">
              <span>系统名称</span>
              <Input defaultValue="管理系统" />
            </div>
          </Col>
          <Col span={12}>
            <div className="setting-item">
              <span>系统主题</span>
              <Select defaultValue="light" style={{ width: '100%' }}>
                <Select.Option value="light">浅色</Select.Option>
                <Select.Option value="dark">深色</Select.Option>
              </Select>
            </div>
          </Col>
          <Col span={12}>
            <div className="setting-item">
              <span>系统通知</span>
              <Switch defaultChecked />
            </div>
          </Col>
          <Col span={12}>
            <div className="setting-item">
              <span>开启日志</span>
              <Switch defaultChecked />
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="安全设置" className="settings-card">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <div className="setting-item">
              <span>登录验证</span>
              <Switch defaultChecked />
            </div>
          </Col>
          <Col span={24}>
            <div className="setting-item">
              <span>密码强度要求</span>
              <Select defaultValue="medium" style={{ width: '100%' }}>
                <Select.Option value="low">低</Select.Option>
                <Select.Option value="medium">中</Select.Option>
                <Select.Option value="high">高</Select.Option>
              </Select>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="dashboard-charts">
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <Card className="chart-card" title="访问统计">
                  <VisitChart />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card className="chart-card" title="用户增长">
                  <UserGrowthChart />
                </Card>
              </Col>
            </Row>
          </div>
        )
      case 'users':
        return (
          <Card title="用户管理" className="user-table-card">
            <Table columns={userColumns} dataSource={userData} />
          </Card>
        )
      case 'settings':
        return settingsContent
      default:
        return null
    }
  }

  const menuItems = [
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

  return (
    <Layout className="dashboard-layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="dashboard-logo">管理系统</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          onClick={({ key }) => setActiveMenu(key)}
        />
      </Sider>
      <Layout>
        <Header className="dashboard-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="trigger-button"
          />
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="logout-button"
          >
            退出登录
          </Button>
        </Header>
        <Content className="dashboard-content">{renderContent()}</Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
