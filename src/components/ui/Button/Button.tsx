import React from 'react';
import { classes } from '@utils';
import './Button.css';
import { T_UNKNOWN_OBJ } from '@t';

const cls = classes('button');

export type TButtonColor = 'coral' | 'green' | 'blue' | 'violet' | 'dark' | 'gray';

interface IButton {
  className?: string
  color?: TButtonColor
  type?: 'button' | 'submit' | 'reset'
  size?: 48 | 36 | 24 | 16
  badge?: string | number
  rounded?: boolean
  disabled?: boolean
  inline?: boolean
  link?: boolean
  filled?: boolean
  transparent?: boolean
  square?: boolean
  children?: React.ReactNode | string
  icon?: React.ComponentType<{ className?: string }>
  leftIcon?: React.ComponentType
  rightIcon?: React.ComponentType
  onClick?: () => void
  onClickCallback?: () => void
  style?: T_UNKNOWN_OBJ
  title?: string
}

const Button: React.FC<IButton> = ({
  className,
  onClick = () => {},
  onClickCallback = () => {},
  color = 'coral',
  type = 'button',
  children,
  size = 48,
  badge,
  rounded,
  disabled,
  inline,
  link,
  filled,
  transparent,
  square,
  style = {},
  icon: Icon = () => null,
  leftIcon: LeftIcon = () => null,
  rightIcon: RightIcon = () => null,
  title,
}) => {
  const icon = typeof Icon === 'object';
  const leftIcon = typeof LeftIcon === 'object';
  const rightIcon = typeof RightIcon === 'object';

  const handleClick = () => {
    onClick();
    onClickCallback();
  };

  return (
    <button
      { ...cls('', {
        [color]: true,
        [size]: true,
        rounded,
        inline,
        link,
        filled,
        transparent,
        square,
        icon,
        badge,
      }, className) }
      disabled={ disabled }
      onClick={ handleClick }
      type={ type }
      style={ style }
      title={ title }
    >
      { leftIcon && <span { ...cls('left-icon') }><LeftIcon /></span> }
      { children || <Icon { ...cls('icon', size.toString()) } /> }
      { rightIcon && <span { ...cls('right-icon') }><RightIcon /></span> }
      { badge && <div { ...cls('badge') }>{badge}</div> }
    </button>
  );
};

export default Button;
