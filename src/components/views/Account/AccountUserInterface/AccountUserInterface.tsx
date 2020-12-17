import React, { useState } from 'react';
import { classes } from '@utils';
import { Link } from 'react-router-dom';
import Button from '../../../ui/Button/Button';
import Switch from '../../../ui/Switch/Switch';
import './AccountUserInterface.css';

const cls = classes('account-user-interface');

const AccountUserInterface:React.FC = () => {
  const [checked1, setChecked1 ] = useState(false);
  const [checked2, setChecked2 ] = useState(false);

  const handleCheck1 = (checked: boolean) => {
    setChecked1(checked);
  };

  const handleCheck2 = (checked: boolean) => {
    setChecked2(checked);
  };

  const handleSubmit = () => {};

  const themeElement = (
    <div { ...cls('theme') }>
      <h3 { ...cls('title') }>Тема</h3>
      <Switch
        { ...cls('switch') }
        onChange={ handleCheck1 }
        checked={ checked1 }
        label="Тёмный режим"
      />
    </div>
  );

  const timeElement = (
    <div { ...cls('theme') }>
      <h3 { ...cls('title') }>Временная зона</h3>
      [GMT +03:00   EUROPE / MOSCOW v]
    </div>
  );

  const languageElement = (
    <div { ...cls('language') }>
      <h3 { ...cls('title') }>Язык</h3>
      [Русский v]
    </div>
  );

  const hotkeysElement = (
    <div { ...cls('hotkeys') }>
      <h3 { ...cls('title') }>Горячие клавиши</h3>
      <Switch
        { ...cls('switch') }
        onChange={ handleCheck2 }
        checked={ checked2 }
        label="Использовать горячие клавиши"
      />
      <Link
        { ...cls('hotkeys-link') }
        to="hotkeys"
        target="_blank"
      >
        Смотреть список горячих клавиш
      </Link>
    </div>
  );

  return (
    <div { ...cls() }>
      {themeElement}
      {timeElement}
      {languageElement}
      {hotkeysElement}
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

export default AccountUserInterface;
