import React, { Fragment } from 'react';
import { classes } from '@utils';
import './TagCoverageWidget.css';
import {
  ScatterPlot,
  ScatterSeries,
  ScatterPoint,
  LinearXAxis,
  LinearYAxis,
  LinearYAxisTickSeries,
  LinearYAxisTickLabel,
  ChartTooltip,
  GridlineSeries,
  Gridline
} from 'reaviz'
import WidgetCard from '../WidgetCard/WidgetCard';

const cls = classes('tag-coverage-widget');

interface IAnalyticTagCoverageData {
  messageCounter: number
  coverageValue: number
  metadata: any
}

interface ITagCoverageWidget {
  data: IAnalyticTagCoverageData[]
}

const COLORS = ['#4579f5', '#00bbff', '#ffaa00', '#c32de1', '#5d2de1' ];

const TagCoverageWidget: React.FC<ITagCoverageWidget> = (props) => {
  const { data } = props

  const scatterData = data.map((item) => (
    {
      key: item.messageCounter,
      data: item.coverageValue,
      metadata: item.metadata
    }
  ));

  const tagListElement = (
    <div { ...cls('table') }>
      <div { ...cls('table-header') }>Теги</div>
      <div { ...cls('table-header') }>Охват</div>
      <div { ...cls('table-header') }>Сообщ.</div>
      { data.map(({ messageCounter, coverageValue, metadata }, index) => (
        <Fragment key={ index }>
          <div { ...cls('table-cell') }>
            <div
              { ...cls('marker') }
              style={ { backgroundColor: COLORS[index % (COLORS.length)] } }
            />
            { metadata.tag }
          </div>
          <div { ...cls('table-cell') }>{ coverageValue }</div>
          <div { ...cls('table-cell') }>{ messageCounter }</div>
        </Fragment>
      )) }
    </div>
  )

  const getTooltipElement = (ctx: any) => {
    const { metadata, x, y } = ctx;
    return (
      <div { ...cls('tooltip') }>
        <p { ...cls('tooltip-title', { 'has-items': !metadata.tag }) }>{ metadata.tag }</p>
        <p { ...cls('tooltip-item') }>Охват: { y }</p>
        <p { ...cls('tooltip-item') }>Кол-во сообщений: { x }</p>
      </div>
    )
  }

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
        <ScatterPlot
          data={ scatterData }
          margins={ 28 }
          gridlines={ (
            <GridlineSeries
              line={ (
                <Gridline
                  direction="y"
                  strokeWidth={ 1 }
                  strokeColor="var(--midnight-purple-60)"
                />
              ) }
            />
          ) }
          xAxis={ (
            <LinearXAxis
              type="value"
              axisLine={ null }
              tickSeries={ (
                <LinearYAxisTickSeries
                  line={ null }
                  label={ null }
                />
              ) }
            />
          ) }
          yAxis={ (
            <LinearYAxis
              type="value"
              axisLine={ null }
              tickSeries={ (
                <LinearYAxisTickSeries
                  line={ null }
                  label={ (
                    <LinearYAxisTickLabel
                      padding={ 8 }
                      position="start"
                      rotation={ 0 }
                      align="center"
                      fontSize={ 14 }
                      fontFamily="inherit"
                    />
                  ) }
                />
              ) }
            />
          ) }
          series={ (
            <ScatterSeries
              point={ (
                <ScatterPoint
                  color={ (_, index) => COLORS[index % (COLORS.length)] }
                  size={ (v) => (v.metadata.radius) }
                  tooltip={ (
                    <ChartTooltip
                      followCursor
                      content={ getTooltipElement }
                    />
                  ) }
                />
              ) }
            />
          ) }
        />
      </div>
      { tagListElement }
    </WidgetCard>
  )
};

export default TagCoverageWidget;
