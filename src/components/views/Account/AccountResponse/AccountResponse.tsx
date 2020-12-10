import React, { useState } from 'react';
import { classes } from '@utils';
import Button from '../../../ui/Button/Button';
import Switch from '../../../ui/Switch/Switch';
// import Input from '../../../ui/Input/Input';
import './AccountResponse.css';

const cls = classes('account-response');

const AccountResponse:React.FC = () => {
  const [checked1, setChecked1 ] = useState(false);
  const [checked2, setChecked2 ] = useState(false);

  const handleCheck1 = (checked: boolean) => {
    setChecked1(checked);
  };

  const handleCheck2 = (checked: boolean) => {
    setChecked2(checked);
  };

  const handleSubmit = () => {};

  const feedbackElement = (
    <div { ...cls('feedback') }>
      <h3 { ...cls('title') }>Фидбэк</h3>
      <Switch
        { ...cls('switch') }
        onChange={ handleCheck1 }
        checked={ checked1 }
        label="Реагирование в соцсетях"
      />
    </div>
  );

  const quickAnswersElement = (
    <div { ...cls('quick-answers') }>
      <h3 { ...cls('title') }>Быстрые ответы</h3>
      <Switch
        { ...cls('switch') }
        onChange={ handleCheck2 }
        checked={ checked2 }
        label="Быстрые сообщения"
      />
    </div>
  );

  return (
    <div { ...cls() }>
      {feedbackElement}
      {quickAnswersElement}
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

export default AccountResponse;
