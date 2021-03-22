import React from 'react';
import { classes } from '@utils';
import { ReactComponent as RightArrow } from '../../assets/header-right-chevron-24.svg';
import LinkOrFragment from '../../../../../../ui/LinkOrFragment/LinkOrFragment';
import './MobileMenuItem.css';

const cls = classes('mobile-menu-item');

export interface IMobileMenuItem {
  leftIcon?: string
  leftIconAltText?: string
  text: string
  subText?: string
  href?: string
  count?: number | string
  useRightIcon?: boolean
  rightContent?: React.ReactNode
  onClick?: () => void
}

const MobileMenuItem: React.FC<IMobileMenuItem> = (
  {
    leftIcon,
    leftIconAltText = '',
    text,
    href,
    subText,
    count,
    useRightIcon,
    rightContent,
    onClick = () => {}
  }
) => (
  <li { ...cls() } onClick={ onClick }>
    <LinkOrFragment href={ href } { ...cls('wrapper') }>
      <div { ...cls('content') }>
        <div { ...cls('label') }>
          { leftIcon && <img { ...cls('left-icon') } src={ leftIcon } alt={ leftIconAltText } /> }
          <p { ...cls('text') }>{ text } { count && <span { ...cls('count') }>{ count }</span> }</p>
        </div>
        { subText && <span { ...cls('sub-text') }>{ subText }</span> }
      </div>

      <div { ...cls('right-content') }>
        { (useRightIcon && !rightContent) && <RightArrow { ...cls('right-arrow') } /> }
        { rightContent }
      </div>
    </LinkOrFragment>
  </li>
);

export default MobileMenuItem;
