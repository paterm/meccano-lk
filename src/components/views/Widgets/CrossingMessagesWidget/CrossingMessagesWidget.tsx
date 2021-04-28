import React from 'react';
import { classes } from '@utils';
import './CrossingMessagesWidget.css';
import WidgetCard from '../WidgetCard/WidgetCard';

const cls = classes('crossing-messages-widget');

interface IAnalyticCrossingMessagesData {
  target: string;
}

interface ICrossingMessagesWidget {
  data: IAnalyticCrossingMessagesData[]
}

const CrossingMessagesWidget: React.FC<ICrossingMessagesWidget> = (props) => {
  const { data } = props

  return (
    <WidgetCard
      { ...cls() }
      title="Пересечение сообщений"
      info="Пересечение сообщений это ..."
      hasDownloadButton
      hasFullScreenButton
    >
      Пересечение сообщений
    </WidgetCard>
  )
};

export default CrossingMessagesWidget;
