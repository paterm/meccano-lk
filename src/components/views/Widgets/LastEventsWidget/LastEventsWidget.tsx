import React from 'react';
import { classes } from '@utils';
import Button, { TButtonColor } from '../../../ui/Button/Button';
import DashboardCard from '../../Dashboard/src/DashboardCard/DashboardCard';
import { ReactComponent as RefreshIcon } from './assets/refresh-icon.svg';
import './LastEventsWidget.css';

const cls = classes('last-events-widget');

type TButton = {
  name?: string
  href: string
  color?: TButtonColor
  icon?: React.ComponentType
};

export type TDashboardEvent = {
  type: 'event' | 'adv',
  hasUpdates: boolean,
  description?: string,
  image?: string,
  buttons: TButton[]
};

type TProps = {
  events: TDashboardEvent[]
};

const getSafeJSX = (html: string) => {
  const bTagRegex = /<b>(.*?)<\/b>/g
  const splitString = html.split(bTagRegex)
  const matches = Array.from(html.matchAll(bTagRegex)).map((m) => m[1])
  return splitString.map((item, index) => {
    const isBold = matches.includes(item)
    if (!item) return null
    return !isBold
      ? <React.Fragment key={ index }>{ item }</React.Fragment>
      : <b key={ index }>{ item }</b>
  });
}

const LastEventsWidget: React.FC<TProps> = ({ events }) => (
  <DashboardCard title="Последние события" { ...cls() }>
    <div { ...cls('container') }>
      { events.map((event, eventIndex) => {
        const {
          hasUpdates,
          type,
          description,
          image,
          buttons
        } = event;

        return (
          <div
            { ...cls('item', { [type]: true }) }
            key={ eventIndex }
            style={ image ? { backgroundImage: `url(${image})` } : {} }
          >
            { hasUpdates && (
              <button { ...cls('item-update') }>
                Есть обновления <RefreshIcon { ...cls('item-update-icon') } />
              </button>
            ) }

            { description && (
              <p { ...cls('item-description') }>
                { getSafeJSX(description) }
              </p>
            )}

            { !!buttons?.length && (
              <div { ...cls('item-footer') }>
                { buttons.map((button, buttonIndex) => (
                  <Button
                    { ...cls('item-button') }
                    key={ buttonIndex }
                    color={ button.color || 'coral' }
                    size={ 36 }
                    rounded
                    icon={ button.icon }
                    style={ button.icon ? { flex: '0 0 36px' } : {} }
                  >
                    {button.name}
                  </Button>
                )) }
              </div>
            ) }
          </div>
        );
      }) }
    </div>
  </DashboardCard>
);

export default LastEventsWidget;
