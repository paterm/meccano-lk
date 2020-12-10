import React from 'react';
import { Helmet } from 'react-helmet';
import { classes } from '@utils';
import defautAvatar from '@assets/images/defaultAvatar.jpg';
import PseudoPopup from '../../ui/PseudoPopup/PseudoPopup';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import './Account.css';

const cls = classes('account');

const Account:React.FC = () => {
  const menu = [
    { text: 'Общие', onClick: () => console.log('Нажал Общие') },
    { text: 'Реагирование', onClick: () => console.log('Нажал Реагирование') },
    { text: 'Уведомления', onClick: () => console.log('Нажал Уведомления') },
    { text: 'Пароль', onClick: () => console.log('Нажал Пароль') },
    { text: 'Интерфейс', onClick: () => console.log('Нажал Интерфейс') },
  ];

  const personElement = (
    <div { ...cls('setting-main-person-data') }>
      <h3 { ...cls('setting-main-title') }>Личные данные</h3>
      <div { ...cls('setting-main-avatar') }>
        <img
          { ...cls('setting-main-avatar-image') }
          src={ defautAvatar }
          alt="Аватар пользователя"
        />
        <div { ...cls('setting-main-avatar-buttons') }>
          <button
            { ...cls('setting-main-avatar-button') }
            onClick={ () => console.log('Удалить фото') }
          >
            Удалить фото
          </button>
          <button
            { ...cls('setting-main-avatar-button') }
            onClick={ () => console.log('Загрузить новое') }
          >
            Загрузить новое
          </button>
        </div>
      </div>
      <div { ...cls('setting-main-inputs') }>
        <Input size={ 36 } value="Михаил" />
        <Input size={ 36 } value="Ершов" />
        <Input size={ 36 } value="Руководитель" />
        <Input size={ 36 } value="Департамент PR" />
      </div>
    </div>
  );

  const personContacts = (
    <div { ...cls('setting-main-person-contacts') }>
      <h3 { ...cls('setting-main-title') }>Личные данные</h3>
      <div { ...cls('setting-main-inputs') }>
        <Input size={ 36 } value="+7 983 233-22-22" />
        <Input size={ 36 } value="ershov@mail.ru" />
      </div>
    </div>
  );

  const bodyElement = (
    <div { ...cls('setting-main') }>
      {personElement}
      {personContacts}
      <Button
        { ...cls('setting-submit-button') }
        type="submit"
        filled
        square
      >
        Сохранить
      </Button>
    </div>
  );

  return (
    <div { ...cls() }>
      <Helmet>
        <title>Настройки аккаунта | Maeccano</title>
      </Helmet>
      <PseudoPopup
        title="Настройки аккаунта"
        activePageName="Общие"
        menu={ menu }
      >
        {bodyElement}
      </PseudoPopup>
    </div>
  );
};

export default Account;
