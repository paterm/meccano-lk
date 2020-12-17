import React from 'react';
import { classes } from '@utils';
import './Overlay.css';

const cls = classes('overlay');

interface IOverlay {
  className?: string
  position?: 'absolute' | 'fixed'
  children?: React.ReactNode | string
}

const Overlay: React.FC<IOverlay> = ({
  className,
  position = 'absolute',
  children,
}) => (
  <div
    { ...cls('', {
      [position]: true,
    }, className) }
  >
    {children}
  </div>
);

export default Overlay;
