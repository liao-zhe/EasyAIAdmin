import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'
import type { BaseResponse } from './types'

// 请求配置
interface RequestConfig<T = any> extends AxiosRequestConfig {
  interceptors?: {
    requestSuccessFn?: (
      config: InternalAxiosRequestConfig
    ) => InternalAxiosRequestConfig
    requestFailureFn?: (err: any) => any
    responseSuccessFn?: (res: AxiosResponse<BaseResponse<T>>) => T
    responseFailureFn?: (err: any) => any
  }
}

// 实例配置
interface MyRequestConfig extends RequestConfig {
  baseURL: string
  timeout?: number
}

class MyRequest {
  instance: AxiosInstance

  constructor(config: MyRequestConfig) {
    // 创建axios实例，设置默认timeout
    this.instance = axios.create({
      timeout: 10000,
      ...config
    })

    // 添加全局拦截器
    this.instance.interceptors.request.use(
      config => {
        // 全局请求拦截器
        const token = localStorage.getItem('token')
        if (token && config.headers) {
          // 添加类型检查
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      error => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      response => {
        // 直接返回响应数据
        return response.data
      },
      error => {
        // 直接返回错误响应数据
        if (error.response?.data) {
          return error.response.data
        }
        // 网络错误时返回统一格式
        return {
          code: 1,
          data: null,
          message: '网络错误，请检查网络连接'
        }
      }
    )

    // 添加实例特定的拦截器
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessFn,
      config.interceptors?.requestFailureFn
    )

    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessFn,
      config.interceptors?.responseFailureFn
    )
  }

  // 封装请求方法
  request<T = any>(config: RequestConfig<T>): Promise<T> {
    return this.instance.request(config)
  }

  get<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET', url })
  }

  post<T = any>(
    url: string,
    data?: any,
    config?: RequestConfig<T>
  ): Promise<T> {
    return this.request({ ...config, method: 'POST', url, data })
  }

  put<T = any>(url: string, data?: any, config?: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PUT', url, data })
  }

  delete<T = any>(url: string, config?: RequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE', url })
  }
}

export default MyRequest
