import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types/index';
import { parsedHeaders } from './helpers/processHeaders';
function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve => {
    const { url, method = 'get', data = null, headers, responseType} = config
    const xhr = new XMLHttpRequest()

    if (responseType) {
      xhr.responseType = responseType
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
      resolve(response)
    }
    xhr.open(method.toUpperCase(), url, true)

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        xhr.setRequestHeader(name, headers[name])
      }
    })

    xhr.send(data)
  }))
}

export default xhr
