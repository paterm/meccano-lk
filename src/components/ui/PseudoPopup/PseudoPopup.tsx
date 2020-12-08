import React from 'react';
import { classes } from '@utils';
import Overlay from '../Overlay/Overlay';
import './PseudoPopup.css';

const cls = classes('pseudo-popup');

interface IPseudoPopup {
  className?: string
  overlay?: boolean
  overlayPosition?: 'absolute' | 'fixed'
  title?: string
  children?: React.ReactNode | string
  bar?: React.ReactNode | string
}

const PseudoPopup: React.FC<IPseudoPopup> = ({
  className,
  overlay = true,
  overlayPosition = 'absolute',
  title,
  children,
  bar,
}) => (
  <div { ...cls('', '', className) }>
    <div { ...cls('container', '', 'container') }>
      <div { ...cls('title') }>
        {title}
      </div>
      <div { ...cls('bar') }>
        {bar}
      </div>
      <div { ...cls('body') }>
        {children}
      </div>
    </div>
    {overlay && <Overlay position={ overlayPosition } />}
  </div>
);

export default PseudoPopup;
