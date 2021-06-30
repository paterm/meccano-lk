import { HOST_API } from '../utils/helpers/env';

const defaultHeaders = {
  'Content-type': 'application/json;',
};

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

interface IBaseApi {
  baseUrl?: string,
  path?: `/${string}`
  headers?: Record<string, string>
}

interface IFetchOptions {
  method?: Methods
  headers?: Record<string, string>
  body?: any
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

  static handleResponse(res: Response) {
    if (!res.ok) return Promise.reject(res.json());
    return res.json();
  }

  private getPath() {
    return `${this.baseUrl}${this.path}`;
  }

  private handleOptions(method: Methods, newOptions?: IFetchOptions): RequestInit {
    const options: IFetchOptions = { method }
    if (newOptions?.headers || this.headers) {
      options.headers = options?.headers || this.headers;
    }
    if (newOptions?.body) {
      options.body = JSON.stringify(options.body);
    }
    return options;
  }

  public post<T>(endpoint: `/${string}`, options?: IFetchOptions): Promise<T> {
    return fetch(this.getPath() + endpoint, this.handleOptions(Methods.POST, options))
      .then(BaseApi.handleResponse);
  }
}

export default BaseApi;
