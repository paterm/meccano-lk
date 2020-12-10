import React from 'react';
import { IStore } from '@interfaces';
import { classes } from '@utils';
import { useSelector } from 'react-redux';
import LogoLink from '../../ui/LogoLink/LogoLink';
import AccountButton from './src/AccountButton/AccountButton';
import NotifyButton from './src/NotifyButton/NotifyButton';
import FAQButton from './src/FAQButton/FAQButton';
import './Header.css';

const cls = classes('header');
interface IHeader {
  onSignIn?: () => void,
  onSignUp?: () => void,
  onLogout?: () => void
}

const Header: React.FC<IHeader> = () => {
  const profile = useSelector((state:IStore) => state.profile);
  const { loggedIn } = useSelector((state:IStore) => state.auth);

  return (
    <header { ...cls() }>
      <LogoLink { ...cls('logo') } />

      <div { ...cls('container', '', 'container') }>
        <LogoLink { ...cls('logo', 'container') } />

        {loggedIn && (
          <div { ...cls('buttons') }>
            <FAQButton />
            <NotifyButton />
          </div>
        )}

        {loggedIn && (
          <AccountButton
            { ...cls('account') }
            profile={ profile }
          />
        )}
      </div>
    </header>
  );
};

export default Header;
