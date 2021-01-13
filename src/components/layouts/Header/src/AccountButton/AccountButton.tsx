import React, { useState } from 'react';
import { TProfile } from '@types';
import { classes, usePopup } from '@utils';
import { ReactComponent as ArrowDown } from '@assets/icons/profile/profile__down-arrow.svg';
import { ReactComponent as ConfigIcon } from '@assets/icons/header/config-icon.svg';
import { ReactComponent as SignOutIcon } from '@assets/icons/header/sign-out.svg';
import defaultAvatar from '@assets/images/defaultAvatar.jpg';
import DropDown from '../../../../ui/DropDown/DropDown';
import SubscribesList from './src/SubscibesList/SubscribesList';
import './AccountButton.css';

const cls = classes('account-button');

interface IAccountButton {
  profile: TProfile
  className?: string
}

const AccountButton: React.FC<IAccountButton> = ({ profile, className }) => {
  const popup = usePopup();

  const [ isOpen, setIsOpen ] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div { ...cls('wrapper') }>
      <button
        { ...cls('', { opened: isOpen }, className) }
        onClick={ handleClick }
      >
        <div
          { ...cls('avatar') }
          style={ { backgroundImage: `url(${profile.avatar || defaultAvatar})` } }
        />
        <div { ...cls('name') }>{ profile.firstName } { profile.lastName }</div>

        <ArrowDown { ...cls('arrow-down') } />
      </button>

      <DropDown
        { ...cls('drop-down') }
        isOpen={ isOpen }
        onClose={ handleClose }
      >
        <div { ...cls('drop-container') }>
          { (profile.post || profile.department) && (
            <div { ...cls('row') }>
              { profile.post && <span { ...cls('text', 'dark-80') }>{ profile.post }</span> }
              { profile.department && <span { ...cls('text') }>{ profile.department }</span> }
            </div>
          ) }
          <div { ...cls('row') }>
            <span { ...cls('text') }>Мои услуги</span>
          </div>

          <SubscribesList { ...cls('subscribes-list') } />
        </div>

        <button
          { ...cls('row') }
          onClick={ () => {
            popup.open('account-main');
            setIsOpen(false);
          } }
        >
          <ConfigIcon { ...cls('icon') } /> <span { ...cls('text', '14') }>Настройки аккаунта</span>
        </button>

        <button { ...cls('row') }>
          <SignOutIcon { ...cls('icon') } /> <span { ...cls('text', '14') }>Выход</span>
        </button>
      </DropDown>
    </div>
  );
};

export default AccountButton;
