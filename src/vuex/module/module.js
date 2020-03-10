import { forEachValue } from '../util';

export default class Module {
  constructor (rawModule) {
    this._rawModule = rawModule || {};
    this._children = rawModule.modules || {};
    this.state = rawModule.state || {};
  }

  getChild (key) {
    /**
     * @desc 得到一个模块的子模块
     * @param { String } key - key值
     */
    return this._children[key];
  }

  forEachChild (fn) {
    forEachValue(this._children, (value, key) => {
      fn(value, key);
    });
  }
}