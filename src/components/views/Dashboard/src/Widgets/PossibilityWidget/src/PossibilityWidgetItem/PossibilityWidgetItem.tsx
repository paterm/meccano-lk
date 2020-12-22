import React from 'react';
import { Link } from 'react-router-dom';
import { classes } from '@utils';
import Button, { TButtonColor } from '../../../../../../../ui/Button/Button';
import './PossibilityWidgetItem.css';

const cls = classes('possibility-widget-item');

export type TPossibilityWidget = {
  title: string
  description: string
  link: string
  color?: TButtonColor
  icon: React.ComponentType<{ className?: string }>
};

interface IPossibilityWidget extends TPossibilityWidget {
  className?: string
}

const PossibilityWidgetItem: React.FC<IPossibilityWidget> = (
  {
    className,
    title,
    description,
    link,
    color,
    icon: Icon = () => null
  }
) => (
  <div { ...cls('', '', className) }>
    <div { ...cls('head') }>
      { Icon && <Icon { ...cls('icon') } /> }
      <h3 { ...cls('title') }>{ title }</h3>
    </div>

    <p { ...cls('description') }>{ description }</p>
    <Button
      { ...cls('button') }
      rounded
      color={ color }
      size={ 36 }
    >
      <Link { ...cls('link') } to={ link }>Подробнее</Link>
    </Button>
  </div>
);

export default PossibilityWidgetItem;
