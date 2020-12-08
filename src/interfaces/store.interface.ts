import { TAuth, TProfile, TMobile } from '@types';

export interface IStore {
  auth: TAuth,
  profile: TProfile,
  mobile: TMobile,
}
