import React from 'react';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import PseudoPopup from '../../ui/PseudoPopup/PseudoPopup';
import AccountGeneral from './src/AccountGeneral/AccountGeneral';
import AccountResponse from './src/AccountResponse/AccountResponse';
import AccountNotifications from './src/AccountNotifications/AccountNotifications';
import AccountPassword from './src/AccountPassword/AccountPassword';
import AccountUserInterface from './src/AccountUserInterface/AccountUserInterface';

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

const Account:React.FC<IAccount> = ({ view: startView }) => {
  const history = useHistory();

  const menu = views.map(({ view, name }) => (
    { view, name, onClick: () => history.push({ search: `?popup=${view}` }) }
  ));

  const getActiveView = (view: string): any => views
    .find((el) => el.view === view)?.component || null;

  const ActiveView = getActiveView(startView);

  return (
    <PseudoPopup
      title="Настройки аккаунта"
      childrenViewName={ startView }
      menu={ menu }
    >
      <Helmet>
        <title>{startView} | Настройки аккаунта | Maeccano</title>
      </Helmet>
      <ActiveView />
    </PseudoPopup>
  );
};

export default Account;
