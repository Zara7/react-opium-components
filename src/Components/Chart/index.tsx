import React from 'react'
  
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ComposedChart,
} from 'recharts'

import { generateRenderProps } from '../../Utils/helpers'
import { ETheme } from '../../Constants/Types/theme.types'

import './Chart.scss'

export type Props = {
/** Define theme */
theme?: ETheme
/** Data is an array with objects (expl. [{data1: '1', data2: '2'}]) */
data: any[]
/** Key in data array for one data (pink) */
data1Key: string
/** Key in data array for second data (blue) */
data2Key: string
/** Width of the chart */
width: number
/** Height of the chart */
height: number
}

const defaultProps: Props = {
  theme: ETheme.DARK,
  data: [],
  data1Key: '',
  data2Key: '',
  width: 250,
  height: 100
}

const CustomizedActiveDot = React.forwardRef((props: { cx: number, cy: number, fill: string}, ref) => {
  const {
    cx, cy,
    fill
  } = props

  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle className="dot-bg" cx={cx} cy={cy} r="5" stroke={fill} />
      <circle cx={cx} cy={cy} r="2" fill={fill} />
    </svg>
  )
})

CustomizedActiveDot.displayName = 'CustomizedActiveDot'

const CustomTooltip = ({ active, payload }: {active: boolean, payload: any}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div
          className="custom-tooltip__container"
          style={{ backgroundColor: payload[0].color }}
        >
          <p
            className="label"
          >
            Buyer:
            <strong> {payload[0].value} </strong>
            tokens
          </p>
        </div>
        <div
          className="custom-tooltip__container"
          style={{ backgroundColor: payload[1].color }}
        >
          <p
            className="label"
          >
            Seller:
            <strong> {payload[1].value} </strong>
            tokens
          </p>
        </div>
      </div>
    )
  }

  return (<div className="tooltip-loading" style={{ backgroundColor: 'white', padding: '0px 8px', borderRadius: '10px' }}>Loading...</div>)
}

const Chart: React.FC<Props> = (props: Props) => {
  const renderProps = generateRenderProps(defaultProps, props)

  const {
    theme,
    data,
    data1Key,
    data2Key,
    width,
    height
  } = renderProps

  const tickChanger = (tickItem: any) => {
    const divided = tickItem / data.length
    return divided === 0 ? '0' : divided.toFixed(2).toString()
  }

  return (
    <div className={`CustomChart color-scheme-${theme}`}>
      <ComposedChart width={width} height={height} data={data} margin={{ top: 25, right: 30, left: 20, bottom: 5 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F6029C" stopOpacity={0.15}/>
            <stop offset="100%" stopColor="#F6029C" stopOpacity={0}/>
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#197CD8" stopOpacity={0.15}/>
            <stop offset="100%" stopColor="#197CD8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid stroke={theme === 'DARK' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(10, 10, 30, 0.1)'} />
        <XAxis
          interval={4}
          tickFormatter={tickChanger}
        />
        <YAxis axisLine />
        {
          // @ts-ignore
          <Tooltip content={<CustomTooltip />} />
        }
        <Area
          type="monotone"
          dataKey={data1Key}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorUv)"

          stroke={'#F6029C'}

          // @ts-ignore
          activeDot={<CustomizedActiveDot />}
        />
        <Area
          type="monotone"
          dataKey={data2Key}
          strokeWidth={2}
          fillOpacity={1}
          fill="url(#colorPv)"

          stroke={'#197CD8'}

          // @ts-ignore
          activeDot={<CustomizedActiveDot />}
        />
      </ComposedChart>    
    </div>
  )
}

export default Chart
