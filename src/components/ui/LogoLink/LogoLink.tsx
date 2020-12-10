import React from 'react';
import { classes } from '@utils';
import { generalData } from '../../../utils/config';
import './LogoLink.css';

const cls = classes('logo-link');

const LogoLink: React.FC<{ className?: string }> = ({ className }) => (
  <a { ...cls('', '', className) } href="/">{ generalData.companyName }</a>
);

export default LogoLink;
