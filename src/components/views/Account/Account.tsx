import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import PseudoPopup from '../../ui/PseudoPopup/PseudoPopup';
import AccountGeneral from './AccountGeneral/AccountGeneral';
import AccountResponse from './AccountResponse/AccountResponse';
import AccountNotifications from './AccountNotifications/AccountNotifications';
import AccountPassword from './AccountPassword/AccountPassword';
import AccountUserInterface from './AccountUserInterface/AccountUserInterface';

const views = [
  { name: 'Общие', component: AccountGeneral, },
  { name: 'Реагирование', component: AccountResponse, },
  { name: 'Уведомления', component: AccountNotifications, },
  { name: 'Пароль', component: AccountPassword, },
  { name: 'Интерфейс', component: AccountUserInterface, },
];

const Account:React.FC = () => {
  const [activeViewName, setActiveViewName] = useState('Общие');

  const menu = views.map(({ name }) => (
    { name, onClick: () => setActiveViewName(name) }
  ));

  const getActiveView = (name: string): any => views
    .find((view) => view.name === name)?.component || null;

  const ActiveView = getActiveView(activeViewName);

  return (
    <PseudoPopup
      title="Настройки аккаунта"
      childrenViewName={ activeViewName }
      menu={ menu }
    >
      <Helmet>
        <title>{activeViewName} | Настройки аккаунта | Maeccano</title>
      </Helmet>
      <ActiveView />
    </PseudoPopup>
  );
};

export default Account;
