import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { classes } from '@utils';
import PseudoPopup from '../../ui/PseudoPopup/PseudoPopup';
import AccountGeneral from './AccountGeneral/AccountGeneral';
import AccountResponse from './AccountResponse/AccountResponse';

const cls = classes('account');

const views = [
  { name: 'Общие', component: AccountGeneral, },
  { name: 'Реагирование', component: AccountResponse, },
  { name: 'Уведомления', component: AccountGeneral, },
  { name: 'Пароль', component: AccountGeneral, },
  { name: 'Интерфейс', component: AccountGeneral, },
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
        <title>{name} | Настройки аккаунта | Maeccano</title>
      </Helmet>
      <ActiveView />
    </PseudoPopup>
  );
};

export default Account;
