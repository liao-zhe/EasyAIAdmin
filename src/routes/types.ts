export interface MetaProps {
  title: string
  auth?: boolean
  icon?: React.ReactNode
  hideInMenu?: boolean
}

export interface RouteConfig {
  path: string
  element: React.ReactNode
  children?: RouteConfig[]
  meta?: MetaProps
}
