import React from 'react';
import { classes } from '@utils';
import Button from '@components/ui/Button/Button';
import { ReactComponent as ArrowDownIcon } from '@assets/icons/button/arrow-down.svg';
import defaultAvatar from '@assets/images/defaultAvatar.jpg';
import './RatingWidget.css';
import WidgetCard from '../WidgetCard/WidgetCard';

const cls = classes('rating-widget');

interface IAnalyticRatingData {
  id: string
  avatar: string
  name: string
  value: number
}

interface IRatingWidget {
  data: IAnalyticRatingData[]
  /* Переопределяет заголовок */
  title?: string
  /* Переопределяет всплывающее описание */
  info?: string
}

const RatingWidget: React.FC<IRatingWidget> = (props) => {
  const { data, title, info } = props

  const maxValue = Math.max(...data.map((item: IAnalyticRatingData) => item.value))
  const conventToPercent = (value: number, max: number) => (
    Math.round((value * 100) / max)
  );

  const getProgressBarElement = (value: number) => (
    <div { ...cls('progress') }>
      { value }
      <div
        { ...cls('progress-bar') }
        style={ { width: `${conventToPercent(value, maxValue)}%` } }
      >
        { value }
      </div>
    </div>
  )

  return (
    <WidgetCard
      { ...cls() }
      title={ title || 'Рейтинг' }
      info={ info || 'Рейтинг' }
      hasDownloadButton
      hasFullScreenButton
    >
      <ul { ...cls('items') }>
        { data.map((item, index) => (
          <li
            { ...cls('item') }
            key={ item.id }
          >
            <span { ...cls('place') }>{ index + 1 }.</span>
            <img
              { ...cls('avatar') }
              src={ item.avatar || defaultAvatar }
              alt={ item.name }
            />
            <p { ...cls('name') }>{ item.name }</p>
            { getProgressBarElement(item.value) }
          </li>
        )) }
      </ul>
      <Button
        { ...cls('button-next') }
        size={ 24 }
        color="gray"
        rightIcon={ ArrowDownIcon }
        transparent
      >
        Показать остальные
      </Button>
    </WidgetCard>
  )
};

export default RatingWidget;
