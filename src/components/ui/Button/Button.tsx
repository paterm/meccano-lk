import React from 'react';
import { classes } from '@utils';
import './Button.css';

const cls = classes('button');

interface IButton {
  className?: string
  color?: 'coral' | 'green' | 'blue' | 'violet' | 'dark' | 'gray'
  type?: 'button' | 'submit' | 'reset'
  size?: 48 | 36
  rounded?: boolean
  inline?: boolean
  filled?: boolean
  square?: boolean
  leftIcon?: React.ReactNode
  children?: React.ReactNode | string
  icon?: React.ComponentType
  rightIcon?: React.ComponentType
  onClick?: () => void
}

const Button: React.FC<IButton> = ({
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
  leftIcon,
  rightIcon: RightIcon = () => null,
  icon: Icon = () => null,
}) => {
  const icon = typeof Icon === 'object';
  const rightIcon = typeof RightIcon === 'object';

  return (
    <button
      { ...cls('', {
        [color]: true,
        [size]: true,
        rounded,
        inline,
        filled,
        square,
        icon
      }, className) }
      onClick={ onClick }
      type={ type }
    >
      { leftIcon && <span { ...cls('left-icon') }>{ leftIcon }</span> }
      { children || <Icon /> }
      { rightIcon && <span { ...cls('right-icon') }><RightIcon /></span> }
    </button>
  );
};

export default Button;
