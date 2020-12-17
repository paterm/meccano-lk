import { TMobile } from '../../types';
import { StoreAction } from '../storeEnum';

export const mobile = (state:TMobile = { isMobile: false }, action: any) => {
  switch (action.type) {
    case StoreAction.IS_MOBILE:
      return {
        ...state,
        isMobile: action.payload
      };
    default:
      return state;
  }
};
