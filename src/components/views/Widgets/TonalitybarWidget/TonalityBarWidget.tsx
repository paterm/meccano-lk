import React from 'react'
import { classes, toPriceFormat } from '@utils';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import dayjs from 'dayjs';
import { IYTick, T_UNKNOWN_OBJ } from '@t';

type TBarItem = {
  pos: number
  ng: number
  ne: number
  date: string
}

type TProps = {
  data: TBarItem[]
}

const cls = classes('tonality-bar-widget');

interface IMyTick extends IYTick {
  formatter: (value: any) => string
}

const MyTick: React.FC<IMyTick> = ({
  payload: { value },
  formatter,
  x,
  y,
  fill,
  height,
  width,
  textAnchor,
  dominantBaseline,
}) => (
  <text
    x={ x }
    y={ y }
    fill={ fill }
    height={ height }
    width={ width }
    textAnchor={ textAnchor }
    dominantBaseline={ dominantBaseline }
    fontSize={ 14 }
    fontWeight={ 600 }
    fontFamily="Montserrat"
    color="#645971"
  >
    {formatter ? formatter(value) : value}
  </text>
)

type TTooltipItem = {
  color: string
  dataKey: string
  fill: string
  formatter: undefined | ((value: string) => string)
  name: string
  payload: T_UNKNOWN_OBJ
  value: any
}

interface IMyTooltip {
  payload: TTooltipItem[]
  [key: string]: any
}

const MyTooltip: React.FC<IMyTooltip> = ({
  payload,
}) => (
  <div>
    {payload.reverse().map((item, itemKey) => (
      <div
        style={ {
          color: item.color,
          backgroundColor: '#fff',
          padding: '4px 8px',
          fontSize: 14,
          fontWeight: 600
        } }
        key={ itemKey }
      >
        {toPriceFormat(item.value)}
      </div>
    ))}
  </div>
)

const TonalityBarWidget: React.FC<TProps> = ({ data }) => (
  <ResponsiveContainer
    { ...cls() }
    height={ 292 }
    width="100%"
  >
    <BarChart
      data={ data }
      height={ 292 }
      width={ 617 }
      barSize={ 24 }
    >
      <CartesianGrid
        strokeDasharray="3 3"
        vertical={ false }
      />

      <XAxis
        dataKey="date"
        tick={ (props) => (
          <MyTick
            formatter={ (value) => dayjs(value).format('D MMM') }
            dominantBaseline="mathematical"
            { ...props }
          />
        ) }
        tickFormatter={ (value) => dayjs(value).format('D') }
        tickLine={ false }
        axisLine={ false }
      />
      <YAxis
        tick={ (props) => (
          <MyTick
            formatter={ (value) => (value > 1000 ? `${value / 1000}k` : value) }
            { ...props }
          />
        ) }
        tickLine={ false }
        axisLine={ false }
      />
      <Bar dataKey="ne" stackId="a" fill="#a19fa9" />
      <Bar dataKey="ng" stackId="a" fill="#ff2525" />
      <Bar dataKey="pos" stackId="a" fill="#16b862" />

      <Tooltip
        isAnimationActive={ false }
        // allowEscapeViewBox={ { x: false, y: true } }
        content={ ({ payload }) => <MyTooltip payload={ payload as TTooltipItem[] } /> }
        cursor={ false }
      />
    </BarChart>
  </ResponsiveContainer>
)

export default TonalityBarWidget
