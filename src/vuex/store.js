import applyMixin from './mixin';
import ModuleCollection from './module/module-collection';
import { forEachValue } from './util';

/**
 * 1. 将各个模块上的getters都统一的放到store上，无论是root上的还是其他子模块上
 *   this._wrappedGetters = {
 *     countDouble (state) { return state.count * 2},
 *     numDouble (state) { return state.num * 2}
 *   },
 * 2. 通过_wrappedGetters 得到 this.getters
 * 3. getters应该是vm上的计算属性
 * 4. 要考虑命名空间的问题，加上命名空间，会发生两个改变：
 *  4.1 getter中的属性名字前面需要加上 模块的名字，比如说：student/numDouble
 *  4.2 getter 函数接收的参数有改变，分别是 本模块的state，本模块的getters，根模块的state，根模块的getters
 */

// 配置的getters：
// coutDouble -> 2*count
// _wrappedGetters:
// countDouble -> fn -> countDouble()

// a b c
// a/b/c/geterName

let Vue;

export function install (_Vue) {
  /**
   * @desc 安装函数 Vue.use(Vuex) 会调用Vuex.install()
   * @param { Vue } - Vue
   */

  Vue = _Vue;
  applyMixin(Vue);
}

export class Store {
  constructor (options) {
    this._wrappedGetters = {};
    this._makeLocalGetterCache = {};
    this._modules = new ModuleCollection(options);

    const state = this._modules.root.state;
    // 安装模块
    installModule(this, state, [], this._modules.root);

    // 重置store的vm实例
    resetStoreVM(this, state);
  }

  get state () {
    return this._vm.state;
  }
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
  const namespace = store._modules.getNamespace(path);

  const local = makeLocalContext(store, namespace, path);

  if(!isRoot) {
    // 1. 获取到父模块的state
    const parentState = getNestedState(rootState, path.slice(0, -1));
    // 2. 
    const moduleName = path[path.length- 1];
    // 3. 向父模块的satte上挂载当前子模块的state
    parentState[moduleName] = module.state;
  }
  
  // 循环遍历模块的getters，注册_wrappedGetters
  module.forEachGetter(function (getterFn, getterName) {
    const type = namespace + getterName;
    registerGetter(store, type, getterFn, local);
  });

  // 循环遍历module的children，安装state
  module.forEachChild(function (childModule, childName) {
    installModule(store, rootState, path.concat(childName), childModule);
  });

}

function getNestedState (rootState, path) {
  return path.reduce((state, key) => state[key], rootState);
}

function registerGetter (store, type, getter, local) {
  /**
   * @desc 注册getter
   * @param { String } type - getter 类型
   * @param { Function } getter - getter 函数
   * @param { Object } local - 本地数据
   */
  store._wrappedGetters[type] = function (store) {
    return getter(local.state, local.getters, store.state, store.getters);
  };
};

function resetStoreVM (store, state) {
  /**
   * @desc 重置Store的 vm 实例
   * @param { Store }
   * @param { Object } state - 状态
   */

  store.getters = {};
  const computed = {
    // countDouble () { return wrappedGetters['countDouble'](); }
  };

  const wrappedGetters = store._wrappedGetters;

  forEachValue(wrappedGetters, (getterFn, getterName) => {
    computed[getterName] = function () { return getterFn(store) }
    Object.defineProperty(store.getters, getterName, {
      get () {
        return store._vm[getterName];
      },
      enumerable: true,
    })
  });

  store._vm = new Vue({
    data: {
      state,
    },
    computed,
  })

}

function makeLocalContext (store, namespace, path) {
  /**
   * @desc 生成本地数据上下文
   * @param { Store } 
   * @param { String } namespace - 命名空间的名字
   * @param { Array } path - 模块路径
   */
  const noNamespace = namespace === '';
  const local = {};

  Object.defineProperties(local, {
    state: {
      get: () => getNestedState(store.state, path),
      enumerable: true,
    },
    getters: {
      get: noNamespace ? () => store.getters: () => makeLocalGetters(store, namespace),
      enumerable: true,
    }
  })

  return local;
}

function makeLocalGetters (store, namespace) {
  /**
   * @desc 生成本地的getter
   * @param { Store } store
   * @param { String } namespace - 命名空间名字
   */
  
  if(!store._makeLocalGetterCache[namespace]) {
    const splitPos = namespace.length;
    const getterProxy = {};
    Object.keys(store.getters).forEach(getterName => {
      if(getterName.slice(0, splitPos) !== namespace) { return };

      const localType = getterName.slice(splitPos);

      Object.defineProperty(getterProxy, localType, {
        get: () => store.getters[getterName],
        enumerable: true,
      })
    });

    store._makeLocalGetterCache[namespace] = getterProxy;
  }

  return store._makeLocalGetterCache[namespace];
}
