import React from 'react';
import { classes } from '@utils';
import { IStore } from '@interfaces';
import { useSelector } from 'react-redux';
import Button from '../../../../ui/Button/Button';
import Input from '../../../../ui/Input/Input';
import './AccountGeneral.css';

const cls = classes('account-general');

const testOnClick = (message: any) => {
  // eslint-disable-next-line no-console
  console.log(`onClick => ${message}`);
};

const AccountGeneral:React.FC = () => {
  const profile = useSelector((state: IStore) => state.profile);

  const personElement = (
    <div { ...cls('person-data') }>
      <h3 { ...cls('title') }>Личные данные</h3>
      <div { ...cls('avatar') }>
        <img
          { ...cls('avatar-image') }
          src={ profile.avatar }
          alt="Аватар пользователя"
        />
        <div { ...cls('avatar-buttons') }>
          <button
            { ...cls('avatar-button') }
            onClick={ () => testOnClick('Удалить фото') }
          >
            Удалить фото
          </button>
          <button
            { ...cls('avatar-button') }
            onClick={ () => testOnClick('Загрузить новое') }
          >
            Загрузить новое
          </button>
        </div>
      </div>
      <div { ...cls('inputs') }>
        <Input size={ 36 } value={ profile.firstName } />
        <Input size={ 36 } value={ profile.lastName } />
        <Input size={ 36 } value={ profile.post } />
        <Input size={ 36 } value={ profile.department } />
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
