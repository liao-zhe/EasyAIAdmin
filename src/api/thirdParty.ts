import { thirdPartyRequest } from './index'
import { WeatherData } from './types'

const thirdPartyApi = {
  // 获取天气数据
  getWeather(city: string) {
    return thirdPartyRequest.get<WeatherData>('/weather', {
      params: { city }
    })
  }
}

export default thirdPartyApi
