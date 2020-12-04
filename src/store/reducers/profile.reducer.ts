import { TProfile } from '@types';
import { StoreAction } from '../storeEnum';

export const profile = (state:TProfile = { firstName: '', lastName: '' }, action: any) => {
  switch (action.type) {
    case StoreAction.SET_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
