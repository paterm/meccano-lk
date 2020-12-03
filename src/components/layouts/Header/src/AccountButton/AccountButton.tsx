import React, { useState } from 'react';
import { ProfileType } from '@types';
import { classes } from '@utils';
import { ReactComponent as ArrowDown } from '@assets/icons/profile/profile__down-arrow.svg';
import defaultAvatar from '@assets/images/defaultAvatar.jpg';
import './AccountButton.css';

const cls = classes('account-button');

interface IAccountButton {
  profile: ProfileType
  className?: string
}

const AccountButton: React.FC<IAccountButton> = ({ profile, className }) => {
  const [ isOpen, setIsOpen ] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button
      { ...cls('', { opened: isOpen }, className) }
      onClick={ handleClick }
    >
      <div
        { ...cls('avatar') }
        style={ { backgroundImage: `url(${profile.avatar || defaultAvatar})` } }
      />
      <div { ...cls('name') }>{profile.firstName} {profile.lastName}</div>

      <ArrowDown { ...cls('arrow-down') } />
    </button>
  );
};

export default AccountButton;
