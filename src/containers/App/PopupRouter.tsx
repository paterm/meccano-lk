import React from 'react';
import { useLocation } from 'react-router-dom';

const Account = React.lazy(() => import('../../components/views/Account/Account'));

const popups: { [key: string]: any } = {
  'account-main': Account,
  'account-response': Account,
  'account-notifications': Account,
  'account-password': Account,
  'account-interface': Account
};

const getQueryParam = (param: string, paramString: string) => {
  const params = new URLSearchParams(paramString);
  return params.get(param);
};

const PopupRouter: React.FC = () => {
  const { search } = useLocation();
  const paramPopup = getQueryParam('popup', search);
  if (!paramPopup) return null;
  if (!(paramPopup in popups)) return null;
  const PopupComponent = popups[paramPopup];
  return <PopupComponent view={ paramPopup } />;
};

export default PopupRouter;
