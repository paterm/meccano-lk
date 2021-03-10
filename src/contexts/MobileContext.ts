import { createContext } from 'react';
import { TMobile } from '@t';

export const MobileContext = createContext({
  isMobile: false
} as TMobile);
