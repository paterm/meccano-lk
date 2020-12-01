import React from 'react';
import { Helmet } from 'react-helmet';
import { classes } from '../../../utils/helpers';

const cls = classes('sign-up');

const SignUp:React.FC = () => (
  <div>
    <Helmet>
      <title>Решистрация | Maeccano</title>
    </Helmet>

    <section { ...cls('content') }>
      SignUp
    </section>
  </div>
);

export default SignUp;
