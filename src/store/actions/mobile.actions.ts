import { StoreAction } from '../storeEnum';

export const setMobile = (isMobile: boolean) => ({
  type: StoreAction.IS_MOBILE,
  payload: isMobile
});
