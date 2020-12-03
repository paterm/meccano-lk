import React from 'react';
import { classes } from '@utils';
import './IconButton.css';

const cls = classes('icon-button');

interface IIconButton {
  className?: string
  icon: React.ComponentType
  title?: string,
  children?: React.ReactNode
}

const IconButton: React.FC<IIconButton> = ({
  className,
  icon: Icon,
  title,
  children
}) => (
  <button { ...cls('', '', className) } title={ title }>
    <Icon />
    { children }
  </button>
);

export default IconButton;
