import React from 'react';
import { classes } from '@utils';
import './DashboardCard.css';

const cls = classes('dashboard-card');

interface IDashboardCard {
  className?: string
  title?: React.ReactNode | string
  rightContent?: React.ReactNode
  children?: React.ReactNode
}

const DashboardCard: React.FC<IDashboardCard> = (
  {
    className,
    title,
    rightContent,
    children
  }
) => (
  <div { ...cls('', '', className) }>
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

export default DashboardCard;
