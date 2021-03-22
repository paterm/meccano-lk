import React from 'react';
import { Link } from 'react-router-dom';
import { classes, toPriceFormat } from '@utils';
import DefaultImage from './assets/rates-bg.jpg';
import Button from '../../../../../ui/Button/Button';
import './RatesWidgetItem.css';

const cls = classes('rates-widget-item');

export interface IRatesWidgetItem {
  title: string
  description: string
  price: number | string
  link: string
  image?: string
}

const RatesWidgetItem: React.FC<{ item: IRatesWidgetItem }> = ({ item }) => (
  <div { ...cls() }>
    <div { ...cls('image') } style={ { backgroundImage: `url(${item.image || DefaultImage}` } } />

    <div { ...cls('content') }>
      <h3 { ...cls('title') }>{ item.title }</h3>
      <p { ...cls('description') }>{ item.description }</p>

      <div { ...cls('pricing') }>
        <span { ...cls('pricing-text') }>Стоимость от</span>
        <div { ...cls('pricing-value') }>
          { toPriceFormat(item.price) } <i>₽</i>
        </div>
      </div>

      <Button { ...cls('button') } rounded size={ 36 }>
        <Link { ...cls('button-link') } to={ item.link }>Подробнее</Link>
      </Button>
    </div>
  </div>
);

export default RatesWidgetItem;
