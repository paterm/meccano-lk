import React from 'react';
import { classes } from '@utils';
import Button from '../../../ui/Button/Button';
// import Input from '../../../ui/Input/Input';
import './AccountResponse.css';

const cls = classes('account-response');

const AccountResponse:React.FC = () => {
  console.log('AccountResponse');

  return (
    <div { ...cls() }>
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
};

export default AccountResponse;
