import Vue from 'vue';
import Vuex from './vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    student: {
      modules: {
        a: {
          state: {
            name: 'a',
          }
        }
      },
      state: {
        num: 100
      }
    }
  },
  state: {
    count: 0,
  }
})