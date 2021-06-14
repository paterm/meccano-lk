import React from 'react';
import { Helmet } from 'react-helmet-async';
import { classes } from '@utils';
import { ReactComponent as AddIcon } from '@assets/icons/dashboard/add.svg';
import { ReactComponent as ConfigIcon } from '@assets/icons/dashboard/config.svg';
import Button from '../../ui/Button/Button';
import RatesWidget from '../Widgets/ReatesWidget/RatesWidget';
import PossibilityWidget from '../Widgets/PossibilityWidget/PossibilityWidget';
import SummaryProjectWidget from '../Widgets/SummaryProjectWidget/SummaryProjectWidget';
import TonalityDynamicWidget from '../Widgets/TonalityDynamicWidget/TonalityDynamicWidget';
import LastEventsWidget from '../Widgets/LastEventsWidget/LastEventsWidget';
import { lastEvents } from './src/mockup';
import './Dashboard.css';

const cls = classes('dashboard');

const Dashboard:React.FC = () => (
  <div { ...cls() }>
    <Helmet>
      <title>Dashboard | Meccano</title>
    </Helmet>
    <div { ...cls('container', '', 'container') }>
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

      <LastEventsWidget events={ lastEvents } />
      <SummaryProjectWidget />
      <TonalityDynamicWidget />
      <PossibilityWidget />
      <RatesWidget />
    </div>
  </div>
);

export default Dashboard;
