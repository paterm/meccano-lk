import React, { useContext } from 'react';
import { MobileContext } from 'src/contexts/MobileContext';
import Button from '@components/ui/Button/Button';
import { ReactComponent as SortIcon } from '@assets/icons/button/sort.svg';
import { ReactComponent as ArrowDownIcon } from '@assets/icons/button/arrow-down.svg';
import { ReactComponent as FacebookIcon } from '@assets/icons/social/facebook.svg';
import { ReactComponent as VkontakteIcon } from '@assets/icons/social/vkontakte.svg';
import { classes } from '@utils';
import defaultAvatar from '@assets/images/defaultAvatar.jpg';
import './AuthorsWidget.css';
import WidgetCard from '../WidgetCard/WidgetCard';

const cls = classes('authors-widget');

interface IAnalyticAuthorsData {
  id: string
  avatar: string
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

  const getValueWithIcon = (value: string) => {
    let Icon = null

    switch (value) {
      case 'facebook': Icon = FacebookIcon; break;
      case 'vk.com': Icon = VkontakteIcon; break;
      default: return null
    }

    return (
      <span { ...cls('value', 'with-icon') }>
        <Icon { ...cls('value-icon') } />
        { value }
      </span>
    )
  }

  const getNumberValueElement = (value: number) => {
    const modifier = value > 0 ? '' : 'is-zero'

    return (
      <span { ...cls('value', modifier) }>
        { value }
      </span>
    )
  }

  const getAuthorNameWithAvatar = (
    author: IAnalyticAuthorsData,
    index: number,
    isShowIndex?: boolean
  ) => (
    <div { ...cls('value', 'with-avatar') }>
      { isShowIndex && (<span { ...cls('author-index') }>{ index + 1 }.</span>) }
      <img
        { ...cls('author-avatar') }
        src={ author.avatar || defaultAvatar }
        alt={ `Аватар ${author.name}` }
      />
      <span { ...cls('author-name') }>
        { author.name }
      </span>
    </div>
  )

  const authorsTableElement = (
    <div { ...cls('scroll-container') }>
      <table { ...cls('authors-table') }>
        <thead>
          <tr { ...cls('table-row', 'is-header') }>
            <td { ...cls('table-cell') }><span { ...cls('value') }>Авторы</span></td>
            <td { ...cls('table-cell') }><span { ...cls('value') }>Площадка</span></td>
            <td { ...cls('table-cell') }><span { ...cls('value') }>Сообщения</span></td>
            <td { ...cls('table-cell') }><span { ...cls('value') }>Media Outreach</span></td>
            <td { ...cls('table-cell') }><span { ...cls('value') }>MFI</span></td>
            <td { ...cls('table-cell') }><span { ...cls('value') } role="img" aria-label="Позитив">😁</span></td>
            <td { ...cls('table-cell') }><span { ...cls('value') } role="img" aria-label="Нейтрал">😐</span></td>
            <td { ...cls('table-cell') }><span { ...cls('value') } role="img" aria-label="Негатив">😡</span></td>
          </tr>
        </thead>
        <tbody>
          {data.map((author, index) => (
            <tr { ...cls('table-row') } key={ index }>
              <td { ...cls('table-cell') }>{ getAuthorNameWithAvatar(author, index, true) }</td>
              <td { ...cls('table-cell') }>{ getValueWithIcon(author.playgroundName) }</td>
              <td { ...cls('table-cell') }>{ getNumberValueElement(author.messageCounter) }</td>
              <td { ...cls('table-cell') }>{ getNumberValueElement(author.mediaOutreachValue) }</td>
              <td { ...cls('table-cell') }>{ getNumberValueElement(author.mfiValue) }</td>
              <td { ...cls('table-cell') }>{ getNumberValueElement(author.positiveCounterCounter) }</td>
              <td { ...cls('table-cell') }>{ getNumberValueElement(author.neutralCounter) }</td>
              <td { ...cls('table-cell') }>{ getNumberValueElement(author.negativeCounter) }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const authorCardsElement = (
    <div { ...cls('author-cards') }>
      { data.map((author, index) => (
        <div
          { ...cls('author-card') }
          key={ author.id }
        >
          <div { ...cls('card-header') }>
            { getAuthorNameWithAvatar(author, index) }
          </div>
          <div { ...cls('card-body') }>
            <div { ...cls('card-row') }>
              <span { ...cls('card-label') }>Площадка</span>
              { getValueWithIcon(author.playgroundName) }
            </div>
            <div { ...cls('card-row') }>
              <span { ...cls('card-label') }>Сообщения</span>
              { getNumberValueElement(author.messageCounter) }
            </div>
            <div { ...cls('card-row') }>
              <span { ...cls('card-label') }>Media Outreach</span>
              { getNumberValueElement(author.mediaOutreachValue) }
            </div>
            <div { ...cls('card-row') }>
              <span { ...cls('card-label') }>MFI</span>
              { getNumberValueElement(author.mfiValue) }
            </div>
            <div { ...cls('card-row') }>
              <span { ...cls('card-label') } role="img" aria-label="Позитив">😁</span>
              { getNumberValueElement(author.positiveCounterCounter) }
            </div>
            <div { ...cls('card-row') }>
              <span { ...cls('card-label') } role="img" aria-label="Позитив">😐</span>
              { getNumberValueElement(author.neutralCounter) }
            </div>
            <div { ...cls('card-row') }>
              <span { ...cls('card-label') } role="img" aria-label="Позитив">😡</span>
              { getNumberValueElement(author.negativeCounter) }
            </div>
          </div>
        </div>
      )) }
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
      isZeroPadding
      customTools={
        !isMobile && (
          <Button
            { ...cls('button-sort') }
            size={ 24 }
            color="gray"
            leftIcon={ SortIcon }
            transparent
          >
            По сообщениям
          </Button>
        )
      }
    >
      { isMobile ? authorCardsElement : authorsTableElement }
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

export default AuthorsWidget;
