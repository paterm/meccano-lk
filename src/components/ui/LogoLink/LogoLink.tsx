import React from 'react';
import { Link } from 'react-router-dom';
import { classes } from '@utils';
import { generalData } from '../../../utils/config';
import './LogoLink.css';

const cls = classes('logo-link');

const LogoLink: React.FC<{ className?: string }> = ({ className }) => (
  <Link { ...cls('', '', className) } to="/">{ generalData.companyName }</Link>
);

export default LogoLink;
