import { useHistory, useLocation } from 'react-router-dom';

type Param = {
  [key: string]: string,
};

export const useQueryParams = () => {
  const history = useHistory();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return {
    get(key: Param['key']) {
      return params.get(key);
    },
    set(param: Param) {
      Object.entries(param).forEach(([key, value]) => {
        if (params.get(key) === value) return;
        if (!params.has(key)) params.append(key, value);
        else params.set(key, value);
        history.push({ search: params.toString() });
      });
    }
  };
};
