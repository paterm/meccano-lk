import React from 'react';
import { classes } from '@utils';
import { ReactComponent as NotificationIcon } from '@assets/icons/header/notification-icon.svg';
import IconButton from '../../../../ui/IconButton/IconButton';
import './NotifyButton.css';

const cls = classes('notify-button');

const NotifyButton: React.FC = () => (
  <IconButton { ...cls() } icon={ NotificationIcon }>
    <div { ...cls('count') }>12</div>
  </IconButton>
);

export default NotifyButton;
