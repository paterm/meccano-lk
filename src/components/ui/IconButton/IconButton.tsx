import React from 'react';
import { classes } from '@utils';
import './IconButton.css';

const cls = classes('icon-button');

interface IIconButton {
  className?: string
  icon: React.ComponentType
  title?: string,
  children?: React.ReactNode
  onClick?: () => void
}

const IconButton: React.FC<IIconButton> = ({
  className,
  icon: Icon,
  title,
  children,
  onClick = () => {}
}) => (
  <button
    { ...cls('', '', className) }
    title={ title }
    onClick={ onClick }
  >
    <Icon />
    { children }
  </button>
);

export default IconButton;
