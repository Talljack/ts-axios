import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types/index';
import { parsedHeaders } from '../helpers/processHeaders';
import { createError } from '../helpers/error';
function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null, headers, responseType, timeout} = config
    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
    }
    if (timeout) {
      xhr.timeout = timeout
    }
    xhr.onreadystatechange = function handler () {
      if (xhr.readyState !== 4) {
        return
      }
      const responseHeaders = parsedHeaders(xhr.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? xhr.response : xhr.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: responseHeaders,
        config,
        request: xhr
      }
      handlerResponse(response)
    }
    xhr.onerror = function handlerError () {
      reject(createError('network error', config, null, xhr))
    }

    xhr.ontimeout = function handlerTimeout () {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, 'ECONNABORTED', xhr))
    }
    xhr.open(method.toUpperCase(), url!, true)

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })

    xhr.send(data)

    function handlerResponse (response: AxiosResponse) : void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(createError(`Request failed with status code ${response.status}`, config, null, xhr, response))
      }
    }
  })
}

export default xhr
