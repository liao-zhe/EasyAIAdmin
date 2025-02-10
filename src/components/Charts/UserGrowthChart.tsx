import React from 'react'
import * as echarts from 'echarts'
import BaseChart from './BaseChart'
import type { EChartsOption } from 'echarts'

const UserGrowthChart: React.FC = () => {
  const option: EChartsOption = {
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
        data: [150, 230, 224, 218, 135, 147, 260],
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
  }

  return <BaseChart option={option} />
}

export default UserGrowthChart
