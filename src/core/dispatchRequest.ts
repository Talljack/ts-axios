import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index';
import xhr from './xhr';
import { buildUrl } from '../helpers/buildUrl';
import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders } from '../helpers/processHeaders';
export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })
}
function processConfig (config: AxiosRequestConfig): void {
  config.url = transformUrl(config)
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)
}
// 配置params拼接成URL
function transformUrl(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url!, params)
}

function transformRequestData (config: any): any {
  return transformRequest(config.data)
}

function transformHeaders (config: AxiosRequestConfig): any {
  const {headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData (res: AxiosResponse):AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}
