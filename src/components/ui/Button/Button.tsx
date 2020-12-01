import React from 'react';
import { classes } from '../../../utils/helpers';
import './Button.css';

const cls = classes('button');

interface ButtonProps {
  className?: string
  color?: 'coral' | 'green' | 'blue' | 'violet' | 'dark'
  type?: 'button' | 'submit' | 'reset'
  size?: 48 | 36
  rounded?: boolean
  inline?: boolean
  filled?: boolean
  square?: boolean
  leftIcon?: React.ReactNode
  children: React.ReactNode

  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
  className,
  onClick = () => {},
  color = 'coral',
  type = 'button',
  children,
  size = 48,
  rounded,
  inline,
  filled,
  square,
  leftIcon
}) => (
  <button
    { ...cls('', {
      [color]: true,
      [size]: true,
      rounded,
      inline,
      filled,
      square
    }, className) }
    onClick={ onClick }
    type={ type }
  >
    { leftIcon && <span { ...cls('left-icon') }>{ leftIcon }</span> }
    { children }
  </button>
);

export default Button;
