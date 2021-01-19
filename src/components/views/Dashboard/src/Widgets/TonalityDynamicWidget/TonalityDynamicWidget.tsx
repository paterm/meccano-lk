import React, { useMemo } from 'react';
import {
  Cell, Label,
  Legend,
  Pie,
  PieChart,
  PieLabelRenderProps,
  ResponsiveContainer, Tooltip
} from 'recharts';
import { classes, toPriceFormat } from '@utils';
import DashboardCard from '../../DashboardCard/DashboardCard';

const cls = classes('tonality-dynamic-widget');

interface IRenderLabel {
  (props: PieLabelRenderProps): React.ReactElement<any>
}

const TonalityDynamicWidget: React.FC = () => {
  const RADIAN = useMemo<number>(() => Math.PI / 180, []);
  const data = [
    {
      name: 'позитив',
      value: 4510,
      color: '#16b862'
    },
    {
      name: 'негатив',
      value: 6340,
      color: '#ff2525'
    },
    {
      name: 'нейтрал',
      value: 3240,
      color: '#a19fa9'
    }
  ];
  const renderCustomizedLabel: IRenderLabel = (props) => {
    const {
      cx = 0,
      cy = 0,
      midAngle = 0,
      innerRadius = 0,
      outerRadius = 0,
      percent = 0,
      value
    } = props;
    const radius = +innerRadius + (+outerRadius - +innerRadius) * 0.5;
    const x = +cx + radius * Math.cos(-midAngle * RADIAN);
    const y = +cy + radius * Math.sin(-midAngle * RADIAN);
    const maxFontSize = 60;
    const minFontSize = 20;
    const currentPercent = percent * 100;
    const fontSize = currentPercent < minFontSize
      ? minFontSize
      : currentPercent > maxFontSize
        ? maxFontSize
        : currentPercent;

    if (currentPercent < 10) {
      return <text />;
    }

    return (
      <text>
        <tspan
          x={ x }
          y={ y }
          fill="white"
          textAnchor="middle"
          fontFamily="Montserrat"
          fontWeight="bold"
          dominantBaseline="central"
          style={ { pointerEvents: 'none' } }
        >
          <tspan fontSize={ fontSize }>{`${(currentPercent).toFixed(0)}`}</tspan>
          <tspan fontSize={ fontSize / 2 } dy=".35em">%</tspan>
        </tspan>
        <tspan
          x={ x }
          dy="1.6em"
          // y={ y + getFontSize('l') }
          fontSize={ fontSize / 2.6 }
          fontWeight="bold"
          fill="white"
          textAnchor="middle"
          style={ { pointerEvents: 'none' } }
        >
          { toPriceFormat(value) }
        </tspan>
      </text>
    );
  };

  return (
    <DashboardCard title="Динамика тональности">
      <ResponsiveContainer
        { ...cls() }
        height={ 360 }
        width="100%"
      >
        <PieChart
          width={ 259 }
          height={ 259 }
        >
          <Pie
            data={ data }
            dataKey="value"
            nameKey="name"
            labelLine={ false }
            label={ renderCustomizedLabel }
          >
            {
              data.map((entry, index) => (
                <Cell
                  key={ `cell-${index}` }
                  fill={ entry.color }
                />
              ))
            }
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </DashboardCard>
  );
};

export default TonalityDynamicWidget;
