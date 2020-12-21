import React from 'react';
import { Link } from 'react-router-dom';
import { classes } from '@utils';
import Card from '../../DashboardCard/DashboardCard';
import RatesWidgetItem, { IRatesWidgetItem } from './src/RatesWidgetItem/RatesWidgetItem';
import './RatesWidget.css';

const cls = classes('rates-widget');
const Rates: IRatesWidgetItem[] = [
  {
    title: 'Мониторинг СМИ',
    description: 'New users choose a single wallet based on real reviews from other users.',
    price: 10000,
    link: ''
  },
  {
    title: 'Мониторинг Соц. сетей',
    description: 'New users choose a single wallet based on real reviews from other users.',
    price: 15000,
    link: ''
  },
  {
    title: 'Мониторинг СМИ',
    description: 'New users choose a single wallet based on real reviews from other users.',
    price: 10000,
    link: ''
  },
  {
    title: 'Мониторинг Соц. сетей',
    description: 'New users choose a single wallet based on real reviews from other users.',
    price: 15000,
    link: ''
  }
];

const RatesWidget: React.FC = () => (
  <Card
    { ...cls() }
    title="Тарифы"
    rightContent={ <Link { ...cls('link') } to="/">Все тарифы</Link> }
  >
    <div { ...cls('list') }>
      { Rates.map((item, itemIndex) => (
        <RatesWidgetItem item={ item } key={ itemIndex } />
      )) }
    </div>
  </Card>
);

export default RatesWidget;
