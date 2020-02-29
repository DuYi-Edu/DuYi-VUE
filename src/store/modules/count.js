import { 
  COUNT_INCREMENT,
} from '../mutation-types';

export default {
  namespaced: true,
  state: {
    count: 0,
  },
  getters: {
    countDouble: (state, getters, rootState) => { 
      console.log(rootState);
      return state.count * 2
    },
    countAdd: state => num => state.count + num,
  },
  mutations: {
    [COUNT_INCREMENT] (state, { num }) { 
        state.count += num;
    },
  },
  actions: {
    countIncrement (context, payload) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit(COUNT_INCREMENT, payload);
          resolve();
        }, 1000)
      })
    }
  },
}