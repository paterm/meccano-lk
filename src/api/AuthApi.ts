import BaseApi from './BaseApi';

export interface IAuthApiLoginRequest {
  email: string
  password: string
}

interface IAuthApiLoginResponse {
  access_token: string
  access_expire: string
  refresh_token: string
  refresh_expire: string
}

export interface IAuthApiRefreshRequest {
  refresh_token: string
}

type IAuthApiRefreshResponse = IAuthApiLoginResponse

class AuthApi extends BaseApi {
  constructor() {
    super({ path: '/auth' });
  }

  public login(body: IAuthApiLoginRequest) {
    return this.post<IAuthApiLoginResponse>('/login', { body });
  }

  public refresh(body: IAuthApiRefreshRequest) {
    return this.post<IAuthApiRefreshResponse>('/refresh', { body });
  }
}

export const authApi = new AuthApi();
