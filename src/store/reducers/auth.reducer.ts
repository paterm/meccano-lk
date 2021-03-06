import { TAuth } from '../../types';
import { StoreAction } from '../storeEnum';

export const auth = (state:TAuth = { loggedIn: false }, action: any) => {
  switch (action.type) {
    case StoreAction.LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload
      };
    default:
      return state;
  }
};
