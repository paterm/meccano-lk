import React from 'react';
import { classes } from '@utils';
import Button from '../../../ui/Button/Button';
import Input from '../../../ui/Input/Input';
import './AccountPassword.css';

const cls = classes('account-password');

const AccountPassword:React.FC = () => {
  const passwordElement = (
    <div { ...cls('password') }>
      <h3 { ...cls('title') }>Изменить пароль</h3>
      <div { ...cls('inputs') }>
        <Input size={ 36 } value="" placeholder="Старый пароль" />
        <Input size={ 36 } value="" placeholder="Новый пароль" />
        <Input size={ 36 } value="" placeholder="Повторить пароль" />
      </div>
    </div>
  );

  return (
    <div { ...cls() }>
      {passwordElement}
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

export default AccountPassword;
