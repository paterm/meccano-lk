import { ProfileType } from '../../types';
import { StoreAction } from '../storeEnum';

export const setProfile = (data:ProfileType) => ({
  type: StoreAction.SET_PROFILE,
  payload: data
});

export const clearProfile = () => ({
  type: StoreAction.CLEAR_PROFILE
});
