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
import { projectData } from '../../mockup';

dayjs.locale('ru');

const cls = classes('summary-project-widget');

const SummaryProjectWidget: React.FC = () => {
  const xTickFormatter = (count: number): string => (
    `${count > 1000 ? count / 1000 : count}${count > 100 ? 'k' : ''}`
  );
  const renderTooltip = useCallback(({ active, payload }) => (
    active ? (
      <div { ...cls('tooltip') }>
        <span { ...cls('tooltip-item') }>Сообщений: { payload[0]?.payload?.messagesCount?.total }</span>
        <span { ...cls('tooltip-item') }>Охват: { payload[0]?.payload?.coverage?.total }</span>
        <span { ...cls('tooltip-item') }>MFI: { payload[0]?.payload?.mfi?.total }</span>
        <span { ...cls('tooltip-item') }>ER: { payload[0]?.payload?.er?.total }</span>
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
        <LineChart data={ projectData }>
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
