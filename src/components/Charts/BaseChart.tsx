import React from 'react'
import ReactECharts from 'echarts-for-react'
import './charts.css'

interface BaseChartProps {
  option: any
}

const BaseChart: React.FC<BaseChartProps> = ({ option }) => {
  return (
    <div className="chart-container">
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%' }}
        opts={{ renderer: 'svg' }}
      />
    </div>
  )
}

export default BaseChart
