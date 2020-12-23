import React from 'react';
import { Link } from 'react-router-dom';
import { classes } from '@utils';
import Card from '../../DashboardCard/DashboardCard';
import Button from '../../../../../ui/Button/Button';
import { Possibilities } from './src/Possibilities';
import PossibilityWidgetItem from './src/PossibilityWidgetItem/PossibilityWidgetItem';
import './PossibilityWidget.css';

const cls = classes('possibility-widget');

const PossibilityWidget: React.FC = () => (
  <Card
    title="Возможности Meccano"
    rightContent={ (
      <div { ...cls('head') }>
        <Button { ...cls('top-button') } rounded filled size={ 36 }>Туториал по Meccano</Button>
        <Link { ...cls('top-link') } to="/">База знаний</Link>
        <Link { ...cls('top-link') } to="/">FAQ</Link>
      </div>
    ) }
  >
    <div { ...cls('list') }>
      { Possibilities.map((item, itemIndex) => (
        <PossibilityWidgetItem
          { ...cls('item') }
          key={ itemIndex }
          title={ item.title }
          description={ item.description }
          icon={ item.icon }
          link={ item.link }
          color={ item.color }
        />
      )) }
    </div>
  </Card>
);

export default PossibilityWidget;
