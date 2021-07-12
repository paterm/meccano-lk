import { useQuery } from 'react-query';
import { useLocation } from 'react-router';
import { userApi } from '../api';
import { QueryUniqueKeys } from './QueryUniqueKeys';

export const useProfileQuery = (options: any = {}) => {
  const { pathsWithDisabledQuery = [] } = options;
  const location = useLocation()
  const isEnabled = !pathsWithDisabledQuery.includes(location.pathname)

  return useQuery(QueryUniqueKeys.Profile, () => userApi.getProfile(), {
    ...options,
    enabled: isEnabled
  })
};
