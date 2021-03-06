import React, { useState, useContext } from 'react';
import { MobileContext } from 'src/contexts/MobileContext';
import { IStore } from '@interfaces';
import { classes } from '@utils';
import { useSelector } from 'react-redux';
import LogoLink from '../../ui/LogoLink/LogoLink';
import AccountButton from './src/AccountButton/AccountButton';
import NotifyButton from './src/NotifyButton/NotifyButton';
import FAQButton from './src/FAQButton/FAQButton';
import MobileMenu from './src/MobileMenu/MobileMenu';
import { getMenuStructure } from './src/MobileMenu/MenuStructure';
import './Header.css';

const cls = classes('header');
interface IHeader {
  onSignIn?: () => void,
  onSignUp?: () => void,
  onLogout?: () => void
}

const Header: React.FC<IHeader> = () => {
  const { isMobile } = useContext(MobileContext);
  const profile = useSelector((state:IStore) => state.profile);
  const { loggedIn } = useSelector((state:IStore) => state.auth);
  const [ isOpen, setIsOpen ] = useState(false);
  const menuStructure = getMenuStructure(profile);

  return (
    <header { ...cls('', { opened: isOpen }) }>
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

        <button { ...cls('mobile-button') } onClick={ () => setIsOpen(!isOpen) }>
          <div { ...cls('burger') } />
        </button>
      </div>

      { isMobile && (
        <MobileMenu
          onClose={ () => setIsOpen(false) }
          structure={ menuStructure }
        />
      ) }
    </header>
  );
};

export default Header;
