import applyMixin from './mixin';
import ModuleCollection from './module/module-collection';

let Vue;

function install (_Vue) {
  /**
   * @desc 安装函数 Vue.use(Vuex) 会调用Vuex.install()
   * @param { Vue } - Vue
   */

  Vue = _Vue;
  applyMixin(Vue);
}

class Store {
  constructor (options) {
    this._vm = new Vue({
      data: {
        state: options.state || {},
      }
    })

    this.state = this._vm.state;

    this._modules = new ModuleCollection(options);

    const state = this._modules.root.state;
    // 安装模块
    installModule(this, state, [], this._modules.root);

  }
}

function getNestedState (rootState, path) {
  return path.reduce((state, key) => {
    return state[key];
  }, rootState);
}

function installModule (store, rootState, path, module) {
  /**
   * @desc 安装模块
   * @param { Store } store - store 实例
   * @param { Objetc } rootState - 根模块的state
   * @param { Array } path - 路径
   * @param { Module } module - 模块
   */

   const isRoot = path.length === 0;

   if(!isRoot) {
      // 1. 获取到父模块的state
      const parentState = getNestedState(rootState, path.slice(0, -1));
      // 2. 
      const moduleName = path[path.length- 1];
      // 3. 向父模块的satte上挂载当前子模块的state
      parentState[moduleName] = module.state;

   }


  // 循环遍历module的children，安装state
  module.forEachChild(function (childModule, childName) {
    installModule(store, rootState, path.concat(childName), childModule);
  });

}

export default {
  install,
  Store,
}

// this.state = {
//   state: {
//     count: 0,
//     student: {
//       num: 100,
//       a: {
//         name: 'a'
//       }
//     }
//   }
// }

// this.modules = {
//   root: {
//     state: { count: 0},
//     _rawModule: rootModule,
//     _children: {
//       student: {
//         state: { num: 100 },
//         _rawModule: studentModule,
//         _children: {
//           a: {
//             state: { name: 'a'},
//             _rawModule: aModule,
//             _children: {}
//           }
//         }
//       }
//     }
//   }
// }