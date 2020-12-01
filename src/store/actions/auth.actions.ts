import { AuthType } from '../types';
import { StoreAction } from '../storeEnum';

export const setAuth = (action:AuthType) => ({
  type: StoreAction.LOGGED_IN,
  loggedIn: action.loggedIn
});
