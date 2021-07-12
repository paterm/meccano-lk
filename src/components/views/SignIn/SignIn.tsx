import React, { ChangeEvent, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { classes } from '@utils';
import Button from '../../ui/Button/Button';
import Checkbox from '../../ui/Checkbox/Checkbox';
import Input from '../../ui/Input/Input';
import { useTokenQuery } from '../../../queries/authQueries';
import './SignIn.css';
import { setAuthToStorage } from '../../../utils/helpers/authStorage';

const cls = classes('sign-in');

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('mukhin.dev@gmail.com');
  const [password, setPassword] = useState('jkWQKYLkK4ub!k8F')
  const [keepAuth, setKeepAuth ] = useState(false);

  // Запрос токена// TODO: Нужны прелоадер и уведомление об ошибке
  const {
    mutate: login,
    data,
    isSuccess,
  } = useTokenQuery();

  // Если успешный ответ
  if (isSuccess && data) {
    // Сохранить токены в хранилище (LocalStorage)
    setAuthToStorage({
      accessToken: data.access_token,
      accessExpire: data.access_expire,
      refreshToken: data.refresh_token,
      refreshExpire: data.refresh_expire,
    })
    // Перенаправить на главную
    return (<Redirect to="/" />)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login({ email, password });
  };

  const handleChange = (evt: ChangeEvent, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter((evt.target as HTMLInputElement).value)
  }

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
          value={ email }
          onChange={ (evt) => handleChange(evt, setEmail) }
        />
        <Input
          { ...cls('input', 'last', '') }
          label="Пароль"
          type="password"
          value={ password }
          onChange={ (evt) => handleChange(evt, setPassword) }
        />
        <Link
          to="/recovery"
          { ...cls('recovery') }
        >
          Забыли пароль?
        </Link>
        <Button
          { ...cls('submit-button') }
          type="submit"
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
          size="l"
        />
      </form>
    </div>
  );
};

export default SignIn;
