import { AxiosRequestConfig, AxiosPromise, Method } from '../types/index';
import dispatchRequest from './dispatchRequest';
export default class Axios {
  request(url?: any, config?: any): AxiosPromise {
    if (typeof url === 'string') {
      if (!config) {
        config = {}
      }
      config.url = url
    } else {
      config = url
    }
    return dispatchRequest(config)
  }
  get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMehtodWithoutData('get', url, config)
  }
  delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMehtodWithoutData('delete', url, config)
  }
  head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMehtodWithoutData('head', url, config)
  }
  options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMehtodWithoutData('options', url, config)
  }
  post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithDate('post', url, data, config)
  }
  put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithDate('put', url, data, config)
  }
  patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWithDate('patch', url, data, config)
  }
  _requestMehtodWithoutData (method: Method, url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method,
      url
    }))
  }
  _requestMethodWithDate(method: Method, url: string, data?: any, config?: AxiosRequestConfig) : AxiosPromise {
    return this.request(Object.assign(config || {}, {
      method,
      url,
      data
    }))
  }
}
