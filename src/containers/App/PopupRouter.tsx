import React from 'react';
import { useLocation } from 'react-router-dom';
import Account from '@views/Account/Account';
import Filter from '@views/Filter/Filter';

const popups: Record<string, React.FC<any>> = {
  'account-main': Account,
  'account-response': Account,
  'account-notifications': Account,
  'account-password': Account,
  'account-interface': Account,
  'filter-main': Filter,
};

const getQueryParam = (param: string, paramString: string) => {
  const params = new URLSearchParams(paramString);
  return params.get(param);
};

interface IPopupRouter {
  loggedIn: boolean
}

const PopupRouter: React.FC<IPopupRouter> = ({ loggedIn }) => {
  const { search } = useLocation();
  const paramPopup = getQueryParam('popup', search);
  if (!loggedIn) return null;
  if (!paramPopup) return null;
  if (!(paramPopup in popups)) return null;
  const PopupComponent = popups[paramPopup];
  return <PopupComponent view={ paramPopup } />;
};

export default PopupRouter;
