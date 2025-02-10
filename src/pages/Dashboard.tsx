import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons'
import {
  Layout,
  Menu,
  Button,
  Card,
  Row,
  Col,
  Switch,
  Input,
  Select,
  Table,
  Space
} from 'antd'
import './Dashboard.css'
import { UserGrowthChart, VisitChart } from '../components/Charts'
import { menuItems } from '../routes'

const { Header, Sider, Content } = Layout

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')

  const handleLogout = (): void => {
    localStorage.removeItem('token')
    navigate('/login')
  }

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
          <div className="dashboard-container">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="用户增长" className="dashboard-card">
                  <UserGrowthChart />
                </Card>
              </Col>
              <Col span={12}>
                <Card title="访问统计" className="dashboard-card">
                  <VisitChart />
                </Card>
              </Col>
            </Row>
          </div>
        )
      case 'users':
        return (
          <Card title="用户列表" className="dashboard-card">
            <Table
              columns={[
                {
                  title: 'ID',
                  dataIndex: 'id',
                  key: 'id'
                },
                {
                  title: '用户名',
                  dataIndex: 'username',
                  key: 'username'
                },
                {
                  title: '角色',
                  dataIndex: 'role',
                  key: 'role',
                  render: (role: string) =>
                    role === 'admin' ? '管理员' : '普通用户'
                },
                {
                  title: '状态',
                  dataIndex: 'status',
                  key: 'status',
                  render: (status: number) => (status === 1 ? '正常' : '禁用')
                },
                {
                  title: '注册时间',
                  dataIndex: 'created_at',
                  key: 'created_at'
                },
                {
                  title: '操作',
                  key: 'action',
                  render: () => (
                    <Space>
                      <Button type="link">编辑</Button>
                      <Button type="link" danger>
                        删除
                      </Button>
                    </Space>
                  )
                }
              ]}
              dataSource={[
                {
                  id: 1,
                  username: 'admin',
                  role: 'admin',
                  status: 1,
                  created_at: '2024-01-01'
                },
                {
                  id: 2,
                  username: 'user',
                  role: 'user',
                  status: 1,
                  created_at: '2024-01-02'
                }
              ]}
              rowKey="id"
              pagination={{
                total: 2,
                pageSize: 10,
                showTotal: total => `共 ${total} 条记录`
              }}
            />
          </Card>
        )
      case 'settings':
        return settingsContent
      default:
        return null
    }
  }

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
            icon={
              collapsed ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuUnfoldOutlined rotate={180} />
              )
            }
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
