import applyMixin from './mixin';
import ModuleCollection from './module/module-collection';
import { forEachValue, isObject } from './util';

/**
 * 1. 将各个模块上的mutations都统一的放到store上，无论是root上的还是其他子模块上
 *  store._mutations = {
 *    countAdd: [fn, fn],
 *    numAdd: [fn]
 *  }
 * 
 * 2. 如果有命名空间。对应的mutation函数的名字前应该加上命名空间的名字，如：
 *  store._mutations = {
 *    countAdd: [fn],
 *    student/numAdd: [fn]
 *    student/countAdd: [fn]
 *  }
 * 
 * 3. 由于需要commit一个mutation。所以在store上应有commit方法
 * 
 * 4. 在严格模式下，只能通过mutation更改state，通过其他的方式需要报出警告
 */

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

    this._mutations = {};
    this._commiting = false;
    this.strict = !!options.strict;

    const state = this._modules.root.state;

    // 安装模块
    installModule(this, state, [], this._modules.root);

    // 重置store的vm实例
    resetStoreVM(this, state);
  }

  get state () {
    return this._vm.state;
  }

  commit (_type, _payload) {
    const { type, payload } = unifyObjectStyle(_type, _payload);
    // 入口函数数组
    const entry = this._mutations[type];

    this._withCommit(() => {
      entry.forEach(handler => handler(payload));
    })
  }

  _withCommit (fn) {
    const commiting = this._commiting;
    this._commiting = true;
    fn();
    this._commiting = commiting;
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

  module.forEachMutation(function (mutationFn, mutationName) {
    const type = namespace + mutationName;
    registerMutation(store, type, mutationFn, local);
  })
  
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
   * @param { Store } store - store 实例
   * @param { String } type - getter 类型
   * @param { Function } getter - getter 函数
   * @param { Object } local - 本地数据
   */
  store._wrappedGetters[type] = function (store) {
    return getter(local.state, local.getters, store.state, store.getters);
  };
};

function registerMutation (store, type, handler, local) {
  /**
   * @desc 注册mutation
   * @param { Store } store - store 实例
   * @param { String } type - mutation 类型
   * @param { Function } handler - mutation 函数
   * @param { Object } local - 本地数据
   */

  const entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function (payload) {
    handler.call(store, local.state, payload);
  });
}

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

  if(store.strict) {
    enableStrictMode(store);
  }
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

function unifyObjectStyle (type, payload) {
  /**
   * @desc 使对象风格统一
   * @returns { Object } 返回值中包含提交的mutation的类型和载荷
   */

  if(isObject(type)) {
    payload = type;
    type = type.type;
  }

   return {
     type,
     payload
   }
}

function enableStrictMode (store) {
  /**
   * @desc 是否可以在严格模式下更新state
   * @param { Store } store - store 实例
   */

   store._vm.$watch(function () {
     return this.state;
   }, () => {
    if(!store._commiting) {
      throw new Error(`[vuex] do not mutate vuex store state outside mutation handlers.`)
    }
   }, {
     deep: true,
     sync: true, // 开启同步
   })
}