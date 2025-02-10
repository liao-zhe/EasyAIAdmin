import React from 'react'
import * as echarts from 'echarts'
import BaseChart from './BaseChart'
import type { EChartsOption } from 'echarts'

const VisitChart: React.FC = () => {
  const option: EChartsOption = {
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
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        }
      }
    ]
  }

  return <BaseChart option={option} />
}

export default VisitChart
