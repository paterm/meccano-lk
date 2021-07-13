import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import { userApi } from '../api';
import { QueryUniqueKeys } from './QueryUniqueKeys';

interface IProfileQueryOptions {
  // Кол-во попыток при ошибке
  retry?: number
  // Пути по которым не нужно проверять действительность токена
  pathsWithDisabledQuery?: `/${string}`[]
  // Callback на ошибку сервера 401
  onWrongAuth?: () => void
}

export const useProfileQuery = (options?: IProfileQueryOptions) => {
  const pathsWithDisabledQuery = options?.pathsWithDisabledQuery || [];
  const location = useLocation()
  const isEnabled = !pathsWithDisabledQuery.includes(location.pathname as `/${string}`)

  return useQuery(QueryUniqueKeys.Profile, () => userApi.getProfile(), {
    enabled: isEnabled,
    retry: options?.retry,
    onError(error: Record<string, any>) {
      if (error.status === 401 && options?.onWrongAuth) {
        options.onWrongAuth();
      }
    }
  })
};
