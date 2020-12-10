import React from 'react';
import { classes } from '@utils';
import defautAvatar from '@assets/images/defaultAvatar.jpg';
import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import './AccountGeneral.css';

const cls = classes('account-general');

const AccountGeneral:React.FC = () => {
  const personElement = (
    <div { ...cls('person-data') }>
      <h3 { ...cls('title') }>Личные данные</h3>
      <div { ...cls('avatar') }>
        <img
          { ...cls('avatar-image') }
          src={ defautAvatar }
          alt="Аватар пользователя"
        />
        <div { ...cls('avatar-buttons') }>
          <button
            { ...cls('avatar-button') }
            onClick={ () => console.log('Удалить фото') }
          >
            Удалить фото
          </button>
          <button
            { ...cls('avatar-button') }
            onClick={ () => console.log('Загрузить новое') }
          >
            Загрузить новое
          </button>
        </div>
      </div>
      <div { ...cls('inputs') }>
        <Input size={ 36 } value="Михаил" />
        <Input size={ 36 } value="Ершов" />
        <Input size={ 36 } value="Руководитель" />
        <Input size={ 36 } value="Департамент PR" />
      </div>
    </div>
  );

  const personContacts = (
    <div { ...cls('person-contacts') }>
      <h3 { ...cls('title') }>Личные данные</h3>
      <div { ...cls('inputs') }>
        <Input size={ 36 } value="+7 983 233-22-22" />
        <Input size={ 36 } value="ershov@mail.ru" />
      </div>
    </div>
  );

  return (
    <div { ...cls() }>
      {personElement}
      {personContacts}
      <Button
        { ...cls('submit-button') }
        type="submit"
        filled
        square
      >
        Сохранить
      </Button>
    </div>
  );
};

export default AccountGeneral;
