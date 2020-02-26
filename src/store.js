import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    studentList: [],
  },
  getters: {
    countDouble: state => state.count * 2,
    countAdd: state => num => state.count + num,
    studentLength: state => state.studentList.length,
    studentJuveniles: state => state.studentList.filter(student => student.age < 18),
  },
});