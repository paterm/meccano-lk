import React from 'react';
import { classes } from '@utils';
import Button from '../../../../../../ui/Button/Button';
import './SubscribesList.css';

const cls = classes('subscribes-list');
const items = [ {
  label: 'Мониторинг СМИ',
  canRenewal: true,
  daysLeft: 5
}, {
  label: 'Мониторинг социальных сетей',
  canRenewal: true,
  daysLeft: 23
}, {
  label: 'Мониторинг СМИ',
  canRenewal: false,
  daysLeft: 60
} ];

const SubscribesList: React.FC<{ className?: string }> = ({ className }) => (
  <div { ...cls('', '', className) }>
    <ul { ...cls('list') }>
      { items.map((item, itemIndex) => (
        <li { ...cls('item') } key={ itemIndex }>
          <div { ...cls('item-col') }>
            <p { ...cls('item-title') }>{ item.label }</p>
            <a { ...cls('item-renewal-link') } href="/">Продлить</a>
          </div>
          <div { ...cls('item-col') }>
            <div { ...cls('item-days') }>{ item.daysLeft } дн.</div>
            <p { ...cls('item-day-text') }>осталось</p>
          </div>
        </li>
      )) }
    </ul>

    <Button>Все тарифы</Button>
  </div>
);

export default SubscribesList;
