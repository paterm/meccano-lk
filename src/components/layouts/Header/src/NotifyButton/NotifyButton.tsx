import React, { useState } from 'react';
import { classes } from '@utils';
import dayjs from 'dayjs';
import { ReactComponent as NotificationIcon } from '@assets/icons/header/notification-icon.svg';
import IconButton from '../../../../ui/IconButton/IconButton';
import DropDown from '../../../../ui/DropDown/DropDown';
import './NotifyButton.css';

type TMessage = {
  title: string
  description: string
  date: string
};

const cls = classes('notify-button');
const messages = [{
  title: 'Вам назначены новые сообщения от Марина Елистратова',
  description: 'Проект #1',
  date: '2020-12-04T114:33:00',
}, {
  title: 'Ваш файл Сообщения за июль СМИ экпортирован',
  description: 'Проект #2',
  date: '2020-12-04T114:33:00',
}, {
  title: 'Добавлен комментарий по документу',
  description: 'Лояльность сотрудников',
  date: '2020-12-16:40:00',
}, {
  title: 'Обновлена аналитика по Тональности',
  description: 'Проект #2',
  date: '2020-12-04T117:23:00',
}, {
  title: 'Дайджест соцмедиа последнего уикенда',
  description: 'Лояльность сотрудников',
  date: '2020-12-04T120:48:00',
}, {
  title: 'Вам назначены новые сообщения от Марина Елистратова',
  description: 'Проект #1',
  date: '2020-12-04T121:03:00',
}, {
  title: 'Ваш файл Сообщения за июль СМИ экпортирован',
  description: 'Проект #1',
  date: '2020-12-04T122:58:00',
}];

const NotifyButton: React.FC = () => {
  const [ isOpen, setIsOpen ] = useState(false);

  return (
    <div { ...cls('wrapper') }>
      <IconButton
        { ...cls() }
        icon={ NotificationIcon }
        onClick={ () => setIsOpen(!isOpen) }
      >
        <div { ...cls('count') }>12</div>
      </IconButton>

      <DropDown
        { ...cls('drop-down') }
        isOpen={ isOpen }
        onClose={ () => setIsOpen(false) }
      >
        <div { ...cls('container') }>
          <div { ...cls('title') }>Новое</div>

          { messages && messages.length ? (
            <ul { ...cls('list') }>
              { messages.map((message: TMessage, messageIndex) => (
                <li { ...cls('item') } key={ messageIndex }>
                  <div { ...cls('item-data') }>
                    <p { ...cls('item-title') }>{ message.title }</p>
                    <p { ...cls('item-description') }>{ message.description }</p>
                  </div>
                  <span { ...cls('item-time') }>{ dayjs(message.date).format('HH:mm') }</span>
                </li>
              )) }
            </ul>
          ) : <p { ...cls('empty') }>У вас нет новых уведомлений</p> }
        </div>
      </DropDown>
    </div>
  );
};

export default NotifyButton;
