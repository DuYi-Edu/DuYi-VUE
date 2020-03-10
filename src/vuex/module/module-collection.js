import Module from './module';
import { forEachValue } from '../util';

export default class ModuleCollection {
  constructor (rawRootModule) {
    this.register([], rawRootModule);
  }

  register (path, rawModule) {
    /**
     * @desc 注册模块
     * @param { Array } path - 当前的路径 
     * @param { Object } rawModule 当前模块
     */

    // 得到一个新的模块
    // const newModule = { state: {},  _rawModule: {}, _children: {} }
    const newModule = new Module(rawModule);


    // 是 根路径
    if(path.length === 0) {
      this.root = newModule;
    } else {
      // 非 根路径
      // 1. 获取到父模块
      const parent = this.get(path.slice(0, -1))
      // 2. 获取到当前模块的名字
      const moduleName = path[path.length - 1];
      parent._children[moduleName] = newModule;
    }

    // 如果当前模块存在子模块
    if(rawModule.modules) {
      const modules = rawModule.modules;  // 拿到子模块
      forEachValue(modules, (rawChildModule, moduleName) => {
        this.register(path.concat(moduleName), rawChildModule);
      })

    }

  }

  get (path) {
    /**
     * @desc 通过路径获取到对应的模块
     * @param { Array } path - 模块路径
     */

    return path.reduce((module, key) => {
      // 向父模块去添加子模块
      return module.getChild(key)
    }, this.root)
  }
  
}


// [] -> root
// [student] -> root - student
// [student, a] -> root - student - a