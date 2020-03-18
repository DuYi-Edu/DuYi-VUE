import { isObject } from './util';

/**
 * @param {String} namespace - 模块的命名空间
 * @param {Object|Array} states - 要获取的state
 * @return {object}
 * 用法：
 *  1. 无命名空间
 *    mapState(['count'])
 *    mapState({ 
 *      conuntAlias: 'count',
 *      countPlusLocalState (state, getters) {
 *        // this -> vm
 *        return state.count + this.lcoalCount
 *      }
 *    })
 *  2. 有命名空间
 *    mapState('namespace', ['count'])
 *    mapState('namespace', { 
 *      conuntAlias: 'count',
 *      countPlusLocalState (state, getters) {
 *        // this -> vm
 *        return state.count + this.lcoalCount
 *      }
 *    })
 */

export const mapState = normalizeNamespace((namespace, states) => {
  const res = {};
  normalizeMap(states).forEach(({key, val}) => {
    
    res[key] = function () {
      // this - vm 实例
      let state = this.$store.state;
      let getters = this.$store.getters;

      if(namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace);

        if(!module) { return }

        state = module.context.state;
        getters = module.context.getters;
      }

      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
  })

  return res;
});

/**
 * @param {String} namespace 
 * @param {Object|Array} getters 
 * @return {Object}
 *  用法：
 *  1. 无命名空间
 *    mapGetters(['countDouble'])
 *    mapGetters({ 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 *  2. 有命名空间
 *    mapState('namespace', ['countDouble'])
 *    mapState('namespace', { 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 */
export const mapGetters = normalizeNamespace((namespace, getters) => {
  const res= {};
  normalizeMap(getters).forEach(({key, val}) => {
    val = namespace + val;

    res[key] = function () {
      if(namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) { return }

      if(!(val in this.$store.getters)) {
        console.error(`[vuex] unkown getter: ${val}`);
        return;
      }

      return this.$store.getters[val];
    }
  })

  return res;
})

/**
 * @param { String } namespace
 * @param { Object|Array } mutations
 * @return { Object } 对象形式的第二个参数的成员可以是一个函数。function(commit: function, ...args: any[])
 * 用法：
 *  1. 无命名空间
 *    mapMutations([''])
 *    mapMutations({ 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 *  2. 有命名空间
 *    mapState('namespace', ['count'])
 *    mapState('namespace', { 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 */
export const mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {};

  normalizeMap(mutations).forEach(({key, val}) => {
    res[key] = function (...args) {
      let commit = this.$store.commit;

      if(namespace) {

        const module = getModuleByNamespace(this.$store, 'mapMutations', namespace);

        if(!module) { return };

        commit = module.context.commit;
      }

      commit.call(this.$store, val, ...args);
    }
  })

  return res;
})

/**
 * @param { String } namespace
 * @param { Object|Array } mutations
 * @return { Object } 
 * 用法：
 *  1. 无命名空间
 *    mapActions([''])
 *    mapActions({ 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 *  2. 有命名空间
 *    mapActions('namespace', ['count'])
 *    mapActions('namespace', { 
 *      conuntDoubleAlias: 'countDouble',
 *    })
 */
export const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {};
  normalizeMap(actions).forEach(({key, val}) => {
    res[key] = function (...args) {
      let dispatch = this.$store.dispatch;

      if(namespace) {
        const module = getModuleByNamespace(this.$store, 'mapActions', namespace);

        if(!module) { return }

        dispatch = module.context.dispatch;
      }

      dispatch.call(this.$store, val, ...args);
    }
  })
  return res;
})

/**
 * 标准化命名空间
 */
function normalizeNamespace(fn) {
  return (namespace, map) => {
    if(typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }

    return fn(namespace, map);
  }
}

/**
 * 标准化map
 * normalizeMap([1, 2, 3]) => [{key:1, val:1}, {key:2,val:2}, {key:3, val:3}];
 * normalizeMap({a:1, b:2, c:3}) => [{key:'a', val:1}, {key:'b', val: 2}, {key:'c',val:3}]
 * @param {Array|Object} map 
 * @return {Array} 
 */
function normalizeMap(map) {
  if(!isValidMap(map)) { return };

  return Array.isArray(map)
    ? map.map(key => ({key, val: key}))
    : Object.keys(map).map(key => ({key, val: map[key]}))
}
/**
 * 校验map是否合法
 * @param {*} map
 * @return {Boolean} 
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map);
}

/**
 * 根据命名空间在store中查找对应的模块，如果模块不不存在，打印错误信息
 * @param {Store} store
 * @param {String} helper
 * @param {String} namespace 
 */
function getModuleByNamespace (store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace];

  if(!module) {
    console.error(`[vuex] module namespace nout found in ${helper}(): ${namespace}`);
  }

  return module;
}
