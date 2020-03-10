export function forEachValue (obj, fn) {
  Object.keys(obj).forEach( key => {
    fn(obj[key], key);
  })
}