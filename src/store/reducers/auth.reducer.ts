import { AuthType } from '../types';
import { StoreAction } from '../storeEnum';

export const AuthReducer = (state:AuthType = { loggedIn: false }, action:any) => {
  switch (action.type) {
    case StoreAction.LOGGED_IN:
      return {
        ...state,
        loggedIn: action.loggedIn
      };
    default:
      return state;
  }
};
