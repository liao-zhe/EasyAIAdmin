import React from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import './charts.css'

interface BaseChartProps {
  option: EChartsOption
  style?: React.CSSProperties
  className?: string
}

const BaseChart: React.FC<BaseChartProps> = ({ option, style, className }) => {
  return (
    <div className="chart-container">
      <ReactECharts
        option={option}
        style={{ height: '100%', ...style }}
        className={className}
        opts={{ renderer: 'svg' }}
      />
    </div>
  )
}

export default BaseChart
