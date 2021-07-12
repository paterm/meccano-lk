import { useMutation } from 'react-query';
import { authApi, IAuthApiLoginRequest } from '../api';

export const useTokenQuery = () => (
  useMutation((user: IAuthApiLoginRequest) => authApi.login(user))
);
