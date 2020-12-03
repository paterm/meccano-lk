import React from 'react';
import { Helmet } from 'react-helmet';
import { classes } from '../../../utils/helpers';
import Button from '../../ui/Button/Button';
import { ReactComponent as AddIcon } from '../../../assets/icons/dashboard/add.svg';
import { ReactComponent as ConfigIcon } from '../../../assets/icons/dashboard/config.svg';
import './Dashboard.css';

const cls = classes('dashboard');

const Dashboard:React.FC = () => (
  <div { ...cls() }>
    <Helmet>
      <title>Dashboard | Maeccano</title>
    </Helmet>
    <div { ...cls('header') }>
      <h2 { ...cls('title') }>
        Михаил, добро пожаловать в Meccano!
      </h2>
      <div { ...cls('toolbar') }>
        <Button
          { ...cls('button') }
          icon={ AddIcon }
          color="gray"
          rounded
        />
        <Button
          { ...cls('button') }
          icon={ ConfigIcon }
          color="coral"
          rounded
        />
      </div>
    </div>

  </div>
);

export default Dashboard;
