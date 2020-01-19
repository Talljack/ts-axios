import * as utils from './utils'

export function transformRequest(data: any): any {
  if (utils.isPlainObj(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse (data: any) :any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // doing nothing
    }
  }
  return data
}
