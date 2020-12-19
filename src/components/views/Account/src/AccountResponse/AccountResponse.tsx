import React, { useState } from 'react';
import { classes } from '@utils';
import { ReactComponent as CloseIcon } from '@assets/icons/button/close.svg';
import { ReactComponent as AddIcon } from '@assets/icons/button/add.svg';
import Input from '../../../../ui/Input/Input';
import Button from '../../../../ui/Button/Button';
import Switch from '../../../../ui/Switch/Switch';
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

  const phrases = [
    {
      text: 'Здравствуйте! Извините за неудобства',
      color: 'coral'
    },
    {
      text: 'Здравствуйте! Назовите номер вашего договора',
      color: 'blue'
    },
    {
      text: 'Могу вам чем то помочь?',
      color: 'purple'
    },
  ];

  const phrasesElement = (
    <ul { ...cls('phrases') }>
      {phrases.map((phrase, index) => (
        <li
          { ...cls('phrase-item') }
          key={ index }
        >
          <span
            { ...cls('phrase-text', `color-${phrase.color}`) }
          >
            { phrase.text }
          </span>
          <Button
            icon={ CloseIcon }
            size={ 24 }
            color="gray"
            transparent
          />
        </li>
      ))}
    </ul>
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
      { phrasesElement }
      <form
        { ...cls('message-form') }
        onSubmit={ () => console.log('Субмит сообщения') }
      >
        <Input
          { ...cls('message-input') }
          size={ 36 }
          placeholder="Добавьте быстрое ссобщение"
        />
        <Button
          { ...cls('message-button') }
          icon={ AddIcon }
          type="submit"
          size={ 36 }
          color="coral"
          filled
          square
        />
      </form>
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
