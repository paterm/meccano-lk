import React from 'react';
import { Helmet } from 'react-helmet';
import { classes } from '../../../utils/helpers';

const cls = classes('sign-in');

const SignIn:React.FC = () => (
  <div { ...cls() }>
    <Helmet>
      <title>Авторизация | Maeccano</title>
    </Helmet>

    <h2 { ...cls('title') }>Вход</h2>
  </div>
);

export default SignIn;
