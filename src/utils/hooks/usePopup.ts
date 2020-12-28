import { useHistory, useLocation } from 'react-router-dom';

export const usePopup = () => {
  const history = useHistory();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  return {
    open(popupName: string) {
      if (params.get('popup') === popupName) return;
      if (!params.has('popup')) params.append('popup', popupName);
      else params.set('popup', popupName);
      history.push({ search: params.toString() });
    },
    close() {
      params.delete('popup');
      history.push({ search: params.toString() });
    }
  };
};
