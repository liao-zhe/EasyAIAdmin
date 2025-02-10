import MyRequest from './request'

// 创建默认请求实例
export const request = new MyRequest({
  baseURL: 'http://localhost:3000/api',
  timeout: 10000
})

// 创建文件上传专用实例
export const uploadRequest = new MyRequest({
  baseURL: 'http://localhost:3000/api/upload',
  timeout: 30000, // 上传文件需要更长的超时时间
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})

// 第三方API请求实例
export const thirdPartyRequest = new MyRequest({
  baseURL: 'https://api.third-party.com',
  timeout: 5000,
  interceptors: {
    requestSuccessFn: config => {
      if (config.headers) {
        config.headers['Api-Key'] = process.env.THIRD_PARTY_API_KEY
      }
      return config
    }
  }
})

export default request
