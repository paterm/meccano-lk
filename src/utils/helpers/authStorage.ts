enum Auth {
  ACCESS_TOKEN = 'access_token',
  ACCESS_EXPIRE = 'access_expire',
  REFRESH_TOKEN = 'refresh_token',
  REFRESH_EXPIRE = 'refresh_expire'
}

interface IAuth {
  accessToken: string,
  accessExpire: string,
  refreshToken: string,
  refreshExpire: string,
}

export const setAuthToStorage = (data: IAuth) => {
  localStorage.setItem(Auth.ACCESS_TOKEN, data.accessToken);
  localStorage.setItem(Auth.ACCESS_EXPIRE, data.accessExpire);
  localStorage.setItem(Auth.REFRESH_TOKEN, data.refreshToken);
  localStorage.setItem(Auth.REFRESH_EXPIRE, data.refreshExpire);
};

export const getAuthFromStorage = (): IAuth => (
  {
    accessToken: localStorage.getItem(Auth.ACCESS_TOKEN) || '',
    accessExpire: localStorage.getItem(Auth.ACCESS_EXPIRE) || '',
    refreshToken: localStorage.getItem(Auth.REFRESH_TOKEN) || '',
    refreshExpire: localStorage.getItem(Auth.REFRESH_EXPIRE) || '',
  }
);

export const removeAuthFromStorage = () => {
  localStorage.removeItem(Auth.ACCESS_TOKEN);
  localStorage.removeItem(Auth.ACCESS_EXPIRE);
  localStorage.removeItem(Auth.REFRESH_TOKEN);
  localStorage.removeItem(Auth.REFRESH_EXPIRE)
};
