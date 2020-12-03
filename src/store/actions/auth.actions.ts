import { StoreAction } from '../storeEnum';

export const setAuth = (loggedIn: boolean) => ({
  type: StoreAction.LOGGED_IN,
  payload: loggedIn
});
