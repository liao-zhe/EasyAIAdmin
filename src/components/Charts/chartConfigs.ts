import * as echarts from 'echarts'
import type { EChartsOption } from 'echarts'

export const getVisitChartOption = (data: number[]): EChartsOption => ({
  title: {
    text: '本周访问量统计'
  },
  tooltip: {},
  xAxis: {
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {},
  series: [
    {
      name: '访问量',
      type: 'bar',
      data,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#83bff6' },
          { offset: 0.5, color: '#188df0' },
          { offset: 1, color: '#188df0' }
        ])
      }
    }
  ]
})

export const getUserGrowthOption = (data: number[]): EChartsOption => ({
  title: {
    text: '本月用户增长趋势'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['1日', '5日', '10日', '15日', '20日', '25日', '30日']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data,
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#5470c6',
        width: 3
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(84,112,198,0.5)' },
          { offset: 1, color: 'rgba(84,112,198,0.1)' }
        ])
      }
    }
  ]
})
