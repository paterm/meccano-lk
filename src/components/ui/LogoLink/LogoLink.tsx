import React from 'react';
import { generalData } from '../../../utils/config';
import './LogoLink.css';

const LogoLink: React.FC = () => <a className="logo-link" href="/">{ generalData.companyName }</a>;

export default LogoLink;
