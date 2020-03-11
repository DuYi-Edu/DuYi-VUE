import Vue from 'vue';
import Vuex from './vuex';

Vue.use(Vuex);

export default new Vuex.Store({
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
          console.log(state, getters, rootState, rootGetters);
          return state.num * 2;
        },
        test () {
          return 10;
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
})

// state = {
//   count: 0,
//   student: {
//     num: 100,
//     a: {
//       name: 'a',
//     }
//   }
// }