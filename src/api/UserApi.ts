import BaseApi from './BaseApi';

interface IApiUserProfileResponse {
  id: string
  email: string
}

class UserApi extends BaseApi {
  constructor() {
    super({ path: '/user' });
  }

  public getProfile() {
    return this.get<IApiUserProfileResponse>('/profile', {
      isAuthorization: true,
    });
  }
}

export const userApi = new UserApi();
