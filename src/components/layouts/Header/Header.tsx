import React from 'react';
import { classes } from '../../../utils/helpers';
import Button from '../../ui/Button/Button';
import LogoLink from '../../ui/LogoLink/LogoLink';
import './Header.css';

const cls = classes('header');
interface IHeader {
  onSignIn?: () => void,
  onSignUp?: () => void
}

const Header: React.FC<IHeader> = ({ onSignIn, onSignUp }) => (
  <header { ...cls() }>
    <div { ...cls('container', '', 'container') }>
      <LogoLink />

      <div { ...cls('buttons') }>
        <Button
          onClick={ onSignIn }
          rounded
          filled
          color="dark"
        >
          Вход
        </Button>
        <Button
          onClick={ onSignUp }
          rounded
          filled
        >
          Зарегистрироваться
        </Button>
      </div>
    </div>
  </header>
);

export default Header;
