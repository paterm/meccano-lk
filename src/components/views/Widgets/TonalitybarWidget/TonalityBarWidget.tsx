import React from 'react'
import { classes } from '@utils';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';
import dayjs from 'dayjs';

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
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="date"
        tickFormatter={ (value) => dayjs(value).format('D MMM') }
      />
      <YAxis />
      <Bar dataKey="ne" stackId="a" fill="#a19fa9" />
      <Bar dataKey="ng" stackId="a" fill="#ff2525" />
      <Bar dataKey="pos" stackId="a" fill="#16b862" />
    </BarChart>
  </ResponsiveContainer>
)

export default TonalityBarWidget
