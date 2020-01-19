const toString = Object.prototype.toString;
export function isDate(val: any) :val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObj (val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export function isPlainObj (val: any) : val is Object {
  return toString.call(val) === '[object Object]'
}
