import React from 'react';
import { classes } from '@utils';
import Button, { TButtonColor } from '../../../../../ui/Button/Button';
import DashboardCard from '../../DashboardCard/DashboardCard';
import { ReactComponent as RefreshIcon } from './assets/refresh-icon.svg';
import './LastEventsWidget.css';

const cls = classes('last-events-widget');

type TButton = {
  name: string
  href: string
  color?: TButtonColor
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
              <p
                { ...cls('item-description') }
                dangerouslySetInnerHTML={ { __html: description } }
              />
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
