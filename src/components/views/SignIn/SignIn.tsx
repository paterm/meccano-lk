import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { classes } from '../../../utils/helpers';
import Button from '../../ui/Button/Button';
import Checkbox from '../../ui/Checkbox/Checkbox';
import Input from '../../ui/Input/Input';
import './SignIn.css';

const cls = classes('sign-in');

const SignIn:React.FC = () => {
  const [keepAuth, setKeepAuth ] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const handleKeepAuth = (checked: boolean) => {
    setKeepAuth(checked);
  };

  return (
    <div { ...cls() }>
      <Helmet>
        <title>Авторизация | Meccano</title>
      </Helmet>

      <form
        { ...cls('form') }
        onSubmit={ handleSubmit }
      >
        <h2 { ...cls('title') }>Вход</h2>
        <Input
          { ...cls('input') }
          label="Email"
        />
        <Input
          { ...cls('input') }
          label="Пароль"
          type="password"
        />
        <Link
          to="/recovery"
          { ...cls('recovery') }
        >
          Забыли пароль?
        </Link>
        <Button
          { ...cls('submit-button') }
          rounded
          filled
        >
          Войти
        </Button>
        <Checkbox
          { ...cls('keep-auth') }
          label="Оставаться в системе"
          onChange={ handleKeepAuth }
          checked={ keepAuth }
          color="coral"
        />
      </form>
    </div>
  );
};

export default SignIn;
