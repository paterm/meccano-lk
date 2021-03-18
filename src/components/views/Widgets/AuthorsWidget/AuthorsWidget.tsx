import React, { useContext } from 'react';
import { MobileContext } from 'src/contexts/MobileContext';
import Button from '@components/ui/Button/Button';
import { ReactComponent as SortIcon } from '@assets/icons/button/sort.svg';
import { classes } from '@utils';
import './AuthorsWidget.css';
import WidgetCard from '../WidgetCard/WidgetCard';

const cls = classes('authors-widget');

interface IAnalyticAuthorsData {
  id: string
  name: string
  playgroundId: string
  playgroundName: string
  messageCounter: number
  mediaOutreachValue: number
  mfiValue: number
  positiveCounter: number
  semiPositiveCounter: number
  positiveCounterCounter: number
  neutralCounter: number
  semiNegativeCounter: number
  negativeCounter: number
}

interface IAuthorsWidget {
  data: IAnalyticAuthorsData[]
}

const AuthorsWidget: React.FC<IAuthorsWidget> = (props) => {
  const { isMobile } = useContext(MobileContext);
  const { data } = props

  const authorsTableElement = (
    <div { ...cls('authors-table') }>
      Таблица пользователй
    </div>
  )

  const authorCardsElement = (
    <div { ...cls('author-cards') }>
      Карточки пользователей
    </div>
  )

  return (
    <WidgetCard
      { ...cls() }
      title="Основные показатели по авторам"
      info="Тут подробная информация о необходимости этих значений и значения этих значений,
      а также значимости этих значений"
      hasDownloadButton
      hasFullScreenButton
      isOverlayHeader
      customTools={ (
        <Button
          { ...cls('button-sort') }
          size={ 24 }
          color="gray"
          leftIcon={ SortIcon }
          transparent
        >
          По сообщениям
        </Button>
      ) }
    >
      { isMobile ? authorCardsElement : authorsTableElement }
    </WidgetCard>
  )
};

export default AuthorsWidget;
