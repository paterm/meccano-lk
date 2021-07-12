import { HOST_API, HOST_CLIENT } from '../utils/helpers/env';
import { getAuthFromStorage } from '../utils/helpers/authStorage';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Origin: HOST_CLIENT as string
};

enum Methods {
  Get = 'GET',
  Post = 'POST',
  Put = 'PUT',
  Delete = 'DELETE',
}

interface IBaseApi {
  baseUrl?: string,
  path?: `/${string}`
  headers?: Record<string, string>
}

interface IFetchOptions {
  method?: Methods
  headers?: Record<string, string>
  isAuthorization?: boolean
  body?: any
  mode?: string
}

class BaseApi {
  readonly baseUrl: string;
  readonly path: string;
  readonly headers: Record<string, string>;

  constructor(config: IBaseApi = {}) {
    this.baseUrl = config.baseUrl || HOST_API || '';
    this.path = config.path || '';
    this.headers = config.headers || defaultHeaders;
  }

  static async handleResponse(res: Response) {
    if (!res.ok) {
      const error = await res.json()
      return Promise.reject(error)
    }
    return res.json();
  }

  private getPath() {
    return `${this.baseUrl}${this.path}`;
  }

  private handleOptions(method: Methods, newOptions?: IFetchOptions): any {
    const options: IFetchOptions = { method }
    if (newOptions?.headers || this.headers) {
      options.headers = options?.headers || this.headers;
    }
    if (newOptions?.isAuthorization) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${getAuthFromStorage().accessToken}`
      }
    }
    if (newOptions?.body) {
      options.body = JSON.stringify(newOptions.body);
    }
    return options;
  }

  public get<T>(endpoint: `/${string}`, options?: IFetchOptions): Promise<T> {
    return fetch(this.getPath() + endpoint, this.handleOptions(Methods.Get, options))
      .then(BaseApi.handleResponse)
  }

  public post<T>(endpoint: `/${string}`, options?: IFetchOptions): Promise<T> {
    return fetch(this.getPath() + endpoint, this.handleOptions(Methods.Post, options))
      .then(BaseApi.handleResponse)
  }
}

export default BaseApi;
