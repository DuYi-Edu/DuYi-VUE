import Vue from 'vue';
import Vuex from './vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    student: {
      namespaced: true,
      modules: {
        a: {
          state: {
            name: 'a',
          }
        }
      },
      state: {
        num: 100
      },
      getters: {
        numDouble (state, getters, rootState, rootGetters) {
          return state.num * 2;
        },
        test () {
          return 10;
        }
      },
      mutations: {
        numAdd (state, { num }) {
          state.num += num;
        },
        countAdd (state, {num}) {
          state.num += num;
        }
      },
      actions: {
        countAddAction ({ commit, dispatch }, payload) {
          commit('countAdd', payload)
          // dispatch('testAction');
        },
        testAction () {
          // console.log('yyy');
        }
      },
    }
  },
  state: {
    count: 0,
  },
  getters: {
    countDouble (state, getters) {
      // console.log(getters);
      return state.count * 2;
    }
  },
  mutations: {
    countAdd (state, { num }) {
      // state -> 本模块中的state
      state.count += num;
    }
  },
  actions: {
    countAddAction ({ commit, dispatch }, payload) {
      commit('countAdd', payload)
    },
    testAction () {
      console.log('xxxx');
    }
  },
})