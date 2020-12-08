import React from 'react';
import { Link } from 'react-router-dom';

interface ILinkOrFragment {
  children: React.ReactNode | string,
  href?: string
  className?: string
}

const LinkOrFragment: React.FC<ILinkOrFragment> = ({ children, href, className }) => (href
  ? <Link className={ className } to={ href }>{ children }</Link> : <>{ children }</>);

export default LinkOrFragment;
