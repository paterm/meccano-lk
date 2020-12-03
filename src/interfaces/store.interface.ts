import { AuthType, ProfileType } from '../types';

export interface IStore {
  auth: AuthType,
  profile: ProfileType,
}
