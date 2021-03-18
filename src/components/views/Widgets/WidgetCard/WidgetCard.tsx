import React from 'react';
import Button from '@components/ui/Button/Button';
import InfoTooltip from '@components/ui/InfoTooltip/InfoTooltip';
import { ReactComponent as DownloadIcon } from '@assets/icons/button/download.svg';
import { ReactComponent as FullScreenIcon } from '@assets/icons/button/full-screen.svg';
import { classes } from '@utils';
import './WidgetCard.css';

const cls = classes('widget-card');

interface IWidgetCard {
  title: string
  info?: string
  children: React.ReactNode
  customTools?: React.ReactNode
  hasDownloadButton?: boolean
  hasFullScreenButton?: boolean
  onClickDownload?: () => void
  onClickFullScreen?: () => void
  // Заголовок и кнопки шапки карточки будут поверх тела
  isOverlayHeader?: boolean
  // Нулевые отступы у тела карточки
  isZeroPadding?: boolean
}

const WidgetCard: React.FC<IWidgetCard> = (props) => {
  const {
    title = '',
    info = '',
    hasDownloadButton = false,
    hasFullScreenButton = false,
    isOverlayHeader = false,
    isZeroPadding = false,
    customTools = null,
    children = null
  } = props

  const headerElement = (
    <div { ...cls('header', { overlay: isOverlayHeader }) }>
      { !!title && (
        <div { ...cls('title') }>{ title }</div>
      ) }
      { !!info && (
        <InfoTooltip { ...cls('info') } text={ info } />
      ) }
      <div { ...cls('tools') }>
        { customTools }
        { hasDownloadButton && (
          <Button
            { ...cls('button-download') }
            size={ 24 }
            color="gray"
            icon={ DownloadIcon }
            transparent
          />
        ) }
        { hasFullScreenButton && (
        <Button
          { ...cls('button-full-screen') }
          size={ 24 }
          color="gray"
          icon={ FullScreenIcon }
          transparent
        />
        ) }
      </div>
    </div>
  )

  return (
    <div { ...cls() }>
      { headerElement }
      <div { ...cls('body', { 'zero-padding': isZeroPadding }) }>
        { children }
      </div>
    </div>
  )
};

export default WidgetCard;
