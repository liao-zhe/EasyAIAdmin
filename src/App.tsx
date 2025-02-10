import React, { Suspense } from 'react'
import { BrowserRouter, useRoutes } from 'react-router-dom'
import { App as AntdApp, Spin } from 'antd'
import { routes } from './routes'
import 'antd/dist/reset.css'

// 路由组件
const RouterComponent: React.FC = () => {
  const element = useRoutes(routes)
  return element
}

const App: React.FC = () => {
  return (
    <AntdApp>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="loading-container">
              <Spin size="large" />
            </div>
          }
        >
          <RouterComponent />
        </Suspense>
      </BrowserRouter>
    </AntdApp>
  )
}

export default App
