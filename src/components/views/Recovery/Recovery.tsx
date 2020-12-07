import React from 'react';
import { Helmet } from 'react-helmet';
import { classes } from '@utils';
import Button from '../../ui/Button/Button';
import Input from '../../ui/Input/Input';
import './Recovery.css';

const cls = classes('recovery');

const SignIn:React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div { ...cls() }>
      <Helmet>
        <title>Восстановление пароля | Meccano</title>
      </Helmet>

      <form
        { ...cls('form') }
        onSubmit={ handleSubmit }
      >
        <h2 { ...cls('title') }>Восстановление пароля</h2>
        <Input
          { ...cls('input') }
          label="Email"
        />
        <Button
          { ...cls('submit-button') }
          rounded
          filled
        >
          Восстановить пароль
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
