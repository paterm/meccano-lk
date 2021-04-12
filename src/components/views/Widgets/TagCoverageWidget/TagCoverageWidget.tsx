import React, { Fragment } from 'react';
import { classes } from '@utils';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import './TagCoverageWidget.css';
import WidgetCard from '../WidgetCard/WidgetCard';

const cls = classes('tag-coverage-widget');

interface IAnalyticTagCoverageData {
  tag: string
  value: number
}

interface ITagCoverageWidget {
  data: IAnalyticTagCoverageData[]
}

interface IScatterLabel {
  tag: string
  x: number
  y: number
  z: number
  fill: string
}

const COLORS = ['#4579f5', '#00bbff', '#ffaa00', '#c32de1', '#5d2de1' ];

const getRandomIntFromRange = (min: number, max: number) => (
  Math.floor(Math.random() * (max - min) + min)
);

const ScatterLabel = (props: IScatterLabel) => {
  const {
    tag,
    x,
    y,
    z,
    fill = '#FFFFFF'
  } = props

  return (
    <g
      cx={ x }
      cy={ y }
      transform={ `translate(${x} ${y})` }
    >
      <circle
        cx={ 0 }
        cy={ 0 }
        r={ z }
        fill={ fill }
      />
      <text
        { ...cls('label-text') }
        x={ `${8 + z}` }
        y="0"
        alignmentBaseline="middle"
      >
        { tag }
      </text>
    </g>
  );
};

const TagCoverageWidget: React.FC<ITagCoverageWidget> = (props) => {
  const { data } = props

  const ScatterChartData = data.map(((el) => (
    {
      tag: el.tag,
      x: getRandomIntFromRange(0, 100),
      y: el.value,
      z: getRandomIntFromRange(10, 30),
    }
  )))

  const tagListElement = (
    <div { ...cls('table') }>
      <div { ...cls('table-header') }>Теги</div>
      <div { ...cls('table-header') }>Охват</div>
      { data.map(({ tag, value }, index) => (
        <Fragment key={ index }>
          <div { ...cls('table-cell') }>
            <div
              { ...cls('marker') }
              style={ { backgroundColor: COLORS[index % (COLORS.length)] } }
            />
            { tag }
          </div>
          <div { ...cls('table-cell') }>{ value }</div>
        </Fragment>
      )) }
    </div>
  )

  return (
    <WidgetCard
      { ...cls() }
      title="Охват тегов"
      info="Охват тегов это ..."
      hasDownloadButton
      hasFullScreenButton
      bodyMixClass={ cls('body').className }
    >
      <div { ...cls('scatter-chart') }>
        <ResponsiveContainer
          width="100%"
          height={ 235 }
        >
          <ScatterChart>
            <CartesianGrid
              vertical={ false }
              strokeDasharray="4 4"
            />
            <XAxis
              type="number"
              dataKey="x"
              name="Смещение X"
              padding={
                { left: 50, right: 100 }
              }
              hide
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Смещение Y"
              tickLine={ false }
              axisLine={ false }
            />
            <Tooltip cursor={ { strokeDasharray: '3 3' } } />
            <Scatter
              name="A school"
              data={ ScatterChartData }
              color="#FFF"
              shape={ (
                <ScatterLabel
                  x={ 0 }
                  y={ 0 }
                  z={ 0 }
                  fill=""
                  tag=""
                />
              ) }
            >
              {data.map((entry, index) => (
                <Cell
                  key={ `cell-${index}` }
                  fill={ COLORS[index % (COLORS.length)] }
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      { tagListElement }
    </WidgetCard>
  )
};

export default TagCoverageWidget;
