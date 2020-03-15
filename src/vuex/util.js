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