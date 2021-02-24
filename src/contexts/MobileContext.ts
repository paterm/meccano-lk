import { createContext } from 'react';
import { TMobile } from '@types';

export const MobileContext = createContext({
  isMobile: false
} as TMobile);
