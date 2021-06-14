import React from 'react';
import { Helmet } from 'react-helmet-async';
import PseudoPopup from '../../ui/PseudoPopup/PseudoPopup';
import AccountGeneral from './src/AccountGeneral/AccountGeneral';
import AccountResponse from './src/AccountResponse/AccountResponse';
import AccountNotifications from './src/AccountNotifications/AccountNotifications';
import AccountPassword from './src/AccountPassword/AccountPassword';
import AccountUserInterface from './src/AccountUserInterface/AccountUserInterface';
import { usePopup } from '../../../utils/hooks';

const views = [
  { view: 'account-main', name: 'Общие', component: AccountGeneral, },
  { view: 'account-response', name: 'Реагирование', component: AccountResponse, },
  { view: 'account-notifications', name: 'Уведомления', component: AccountNotifications, },
  { view: 'account-password', name: 'Пароль', component: AccountPassword, },
  { view: 'account-interface', name: 'Интерфейс', component: AccountUserInterface, },
];

interface IAccount {
  view: string
}

const Account:React.FC<IAccount> = ({ view }) => {
  const popup = usePopup();

  const menu = views.map((el) => (
    { view: el.view, name: el.name, onClick: () => popup.open(el.view) }
  ));

  const getActiveView = (slug: string): any => views
    .find((el) => el.view === slug)?.component || null;

  const getViewName = (slug: string): any => views
    .find((el) => el.view === slug)?.name || '';

  const ActiveView = getActiveView(view);
  const activeViewName = getViewName(view);

  return (
    <PseudoPopup
      title="Настройки аккаунта"
      childrenView={ view }
      childrenViewName={ activeViewName }
      menu={ menu }
    >
      <Helmet>
        <title>{ activeViewName } | Настройки аккаунта | Meccano</title>
      </Helmet>
      <ActiveView />
    </PseudoPopup>
  );
};

export default Account;
