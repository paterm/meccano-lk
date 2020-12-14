import React, { useState } from 'react';
import { classes } from '@utils';
import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import Switch from '../../../ui/Switch/Switch';
import './AccountNotifications.css';

const cls = classes('account-notifications');

const notificationsInsideArray = [
  { name: 'Новые сообщения', checked: false },
  { name: 'Новые документы', checked: false },
  { name: 'Обновление аналитики', checked: true },
  { name: 'Комментарии по документам', checked: true },
  { name: 'Назначенные сообщения', checked: true },
  { name: 'Новые сообщения', checked: true },
  { name: 'Новые документы', checked: true },
];

const notificationsOutsideArray = [
  { name: 'Дублировать внутрисистемные сообщения на почту', checked: false },
  { name: 'Дублировать в Телеграм', checked: false },
  { name: 'Рассылка Meccano', checked: false },
];

const AccountNotifications:React.FC = () => {
  const [notificationsInside, setNotificationsInside ] = useState(notificationsInsideArray);
  const [notificationsOutside, setNotificationsOutside ] = useState(notificationsOutsideArray);

  const handleNotificationsInside = (checked: boolean, index: number) => {
    const copyArray = [...notificationsInside];
    copyArray[index].checked = checked;
    setNotificationsInside(copyArray);
  };

  const handleNotificationsOutside = (checked: boolean, index: number) => {
    const copyArray = [...notificationsOutside];
    copyArray[index].checked = checked;
    setNotificationsOutside(copyArray);
  };

  const handleSubmit = () => {};

  const notificationsInsideElement = (
    <div { ...cls('inside') }>
      <h3 { ...cls('title') }>Внутрисистемные</h3>
      <div { ...cls('grid') }>
        {notificationsInside.map((item, index) => (
          <Switch
            { ...cls('switch') }
            key={ index }
            onChange={ (e) => handleNotificationsInside(e, index) }
            checked={ notificationsInside[index].checked }
            label={ item.name }
          />
        ))}
      </div>
    </div>
  );

  const notificationsOutsideElement = (
    <div { ...cls('outside') }>
      <h3 { ...cls('title') }>Внешние</h3>
      <div { ...cls('grid') }>
        {notificationsOutside.map((item, index) => (
          <Switch
            { ...cls('switch') }
            key={ index }
            onChange={ (e) => handleNotificationsOutside(e, index) }
            checked={ notificationsOutside[index].checked }
            label={ item.name }
          />
        ))}
        <Input
          { ...cls('telegram') }
          size={ 36 }
          value="@mihaershov"
          disabled={ !notificationsOutside[1].checked }
        />
      </div>
    </div>
  );

  return (
    <div { ...cls() }>
      {notificationsInsideElement}
      {notificationsOutsideElement}
      <Button
        { ...cls('submit-button') }
        type="submit"
        onClick={ handleSubmit }
        filled
        square
      >
        Сохранить
      </Button>
    </div>
  );
};

export default AccountNotifications;
