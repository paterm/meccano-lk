import BaseApi from './BaseApi';

interface IAuthApiLoginRequest {
  email: string
  password: string
}

interface IAuthApiLoginResponse {
  access_token: string
  access_expire: string
  refresh_token: string
  refresh_expire: string
}

class AuthApi extends BaseApi {
  constructor() {
    super({ path: '/auth' });
  }

  public login(body: IAuthApiLoginRequest) {
    return this.post<IAuthApiLoginResponse>('/login', {
      body,
    });
  }
}

export const authApi = new AuthApi();
