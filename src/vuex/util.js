export function forEachValue (obj, fn) {
  Object.keys(obj).forEach( key => fn(obj[key], key));
}

export function isObject (obj) {
  /**
   * @desc 判断数据是否为对象
   * @param { * }
   * @returns { Boolean }
   */

  return typeof obj === 'object' && obj !== null
}

export function isPromise (val) {
  /**
   * @desc 判断数据是否为promise
   * @param { * }
   * @returns { Boolean }
   */

  return val && typeof val.then === 'function';
}