import React from 'react';
import { useSelector } from 'react-redux';
import LogoLink from '../../ui/LogoLink/LogoLink';
import { IStore } from '../../../interfaces';
import { classes } from '../../../utils/helpers';
import './Header.css';

const cls = classes('header');
interface IHeader {
  onSignIn?: () => void,
  onSignUp?: () => void,
  onLogout?: () => void
}

const Header: React.FC<IHeader> = () => {
  const profile = useSelector((state:IStore) => state.profile);

  return (
    <header { ...cls() }>
      <div { ...cls('container', '', 'container') }>
        <LogoLink />

        <div { ...cls('buttons') }>
          {profile && (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
