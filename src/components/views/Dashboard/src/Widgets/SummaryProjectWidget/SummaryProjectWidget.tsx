import React, { useCallback } from 'react';
import {
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import './SummaryProjectWidget.css';
import { classes } from '@utils';
import Card from '../../DashboardCard/DashboardCard';

dayjs.locale('ru');

const cls = classes('summary-project-widget');

const SummaryProjectWidget: React.FC = () => {
  const data = [
    {
      date: '2020-01-03T00:00:00',
      value: 4900,
      messagesCount: 152,
      coverage: 2601,
      mfi: 13,
      er: 23
    },
    {
      date: '2020-01-04T00:00:00',
      value: 9500,
      messagesCount: 135,
      coverage: 1074,
      mfi: 22,
      er: 68
    },
    {
      date: '2020-01-05T00:00:00',
      value: 6400,
      messagesCount: 168,
      coverage: 965,
      mfi: 21,
      er: 12
    },
    {
      date: '2020-01-06T00:00:00',
      value: 7500,
      messagesCount: 625,
      coverage: 234,
      mfi: 24,
      er: 98
    },
    {
      date: '2020-01-07T00:00:00',
      value: 23750,
      messagesCount: 435,
      coverage: 2698,
      mfi: 135,
      er: 21
    },
    {
      date: '2020-01-08T00:00:00',
      value: 12400,
      messagesCount: 385,
      coverage: 2365,
      mfi: 23,
      er: 89
    },
    {
      date: '2020-01-08T00:00:00',
      value: 15600,
      messagesCount: 270,
      coverage: 1567,
      mfi: 43,
      er: 43
    }
  ];
  const xTickFormatter = (count: number): string => (
    `${count > 1000 ? count / 1000 : count}${count > 100 ? 'k' : ''}`
  );
  const renderTooltip = useCallback(({ active, payload }) => (
    active ? (
      <div { ...cls('tooltip') }>
        <span { ...cls('tooltip-item') }>Сообщений: { payload[0]?.payload?.messagesCount }</span>
        <span { ...cls('tooltip-item') }>Охват: { payload[0]?.payload?.coverage }</span>
        <span { ...cls('tooltip-item') }>MFI: { payload[0]?.payload?.mfi }</span>
        <span { ...cls('tooltip-item') }>ER: { payload[0]?.payload?.er }</span>
      </div>
    ) : null
  ), []);

  return (
    <Card title="Сводка по проекту Учебный центр">
      <ResponsiveContainer
        { ...cls() }
        height={ 292 }
        width="100%"
      >
        <LineChart data={ data }>
          <CartesianGrid
            vertical={ false }
          />
          <Line
            dataKey="value"
            type="linear"
            dot={ false }
            stroke="#16b862"
            strokeWidth={ 2 }
          />
          <XAxis
            dataKey="date"
            axisLine={ false }
            tickFormatter={ (date) => dayjs(date).format('D MMM') }
            tickMargin={ 8 }
          />
          <YAxis
            axisLine={ false }
            tickFormatter={ xTickFormatter }
          />
          <Tooltip
            content={ renderTooltip }
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SummaryProjectWidget;
