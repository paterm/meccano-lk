import React from 'react';
import { classes } from '@utils';
import './Card.css';

const cls = classes('card');

interface ICard {
  className?: string
  title?: React.ReactNode | string
  rightContent?: React.ReactNode
  children?: React.ReactNode
  withoutTopBorder?: boolean
}

const Card: React.FC<ICard> = (
  {
    className,
    title,
    rightContent,
    children,
    withoutTopBorder = false
  }
) => (
  <div { ...cls('', { 'without-top-border': withoutTopBorder }, className) }>
    { (title || rightContent) && (
      <div { ...cls('header') }>
        <h2 { ...cls('title') }>{ title }</h2>
        { rightContent && (
          <div { ...cls('right-content') }>
            { rightContent }
          </div>
        ) }
      </div>
    ) }

    { children && (
      <div { ...cls('content') }>
        { children }
      </div>
    ) }
  </div>
);

export default Card;
