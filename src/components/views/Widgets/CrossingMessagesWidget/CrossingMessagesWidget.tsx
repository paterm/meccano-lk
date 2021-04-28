import React from 'react';
import { classes } from '@utils';
import {
  VennDiagram,
  VennDiagramData,
  VennSeries,
  VennArc,
  VennLabel,
  ChartTooltip
} from 'reaviz'
import WidgetCard from '../WidgetCard/WidgetCard';
import './CrossingMessagesWidget.css';

const cls = classes('crossing-messages-widget');
const COLORS = ['#16b862', '#00bbff', '#ffaa00' ];

interface ICrossingMessagesData {
  items: {
    [key: string]: {
      messageCounter: number,
      coverageValue: number,
      mfiValue: number,
      erValue: number
    }
  }
  crossing: VennDiagramData[]
}

interface ICrossingMessagesWidget {
  data: ICrossingMessagesData
}

const CrossingMessagesWidget: React.FC<ICrossingMessagesWidget> = (props) => {
  const { data } = props;

  const legendElement = () => (
    <div { ...cls('legend') }>
      <div { ...cls('legend-wrapper') }>
        { Object.keys(data.items).map((key, index) => (
          <div
            { ...cls('legend-item') }
            key={ index }
          >
            <div
              { ...cls('legend-marker') }
              style={ { backgroundColor: COLORS[index % (COLORS.length)] } }
            />
            { key }
          </div>
        )) }
      </div>
    </div>
  )

  const getTooltipElement = ({ x: key }: { x: string }) => {
    const tooltipData = data.items[key]
    return (
      <div { ...cls('tooltip') }>
        <p { ...cls('tooltip-title', { 'has-items': !tooltipData }) }>{ key }</p>
        {
          !!tooltipData && (
            <>
              <p { ...cls('tooltip-item') }>Сообщений: { tooltipData.messageCounter }</p>
              <p { ...cls('tooltip-item') }>Охват: { tooltipData.coverageValue }</p>
              <p { ...cls('tooltip-item') }>MFI: { tooltipData.mfiValue }</p>
              <p { ...cls('tooltip-item') }>ER: { tooltipData.erValue }%</p>
            </>
          )
        }
      </div>
    )
  }

  return (
    <WidgetCard
      { ...cls() }
      title="Пересечение сообщений"
      info="Пересечение сообщений это ..."
      bodyMixClass={ cls('body').className }
      hasDownloadButton
      hasFullScreenButton
    >
      <div { ...cls('venn') }>
        <VennDiagram
          height={ 420 }
          data={ data.crossing }
          series={ (
            <VennSeries
              colorScheme={ (_, index) => COLORS[index % (COLORS.length)] }
              arc={ (
                <VennArc
                  strokeWidth={ 0 }
                  gradient={ null }
                  tooltip={ (
                    <ChartTooltip
                      followCursor
                      content={ getTooltipElement }
                    />
                    ) }
                />
              ) }
              label={ (
                <VennLabel
                  labelType="value"
                  showAll
                  fill="var(--white)"
                  fontFamily="inherit"
                  fontSize={ 24 }
                />
              ) }
            />
          ) }
        />
      </div>
      { legendElement() }
    </WidgetCard>
  )
};

export default CrossingMessagesWidget;
