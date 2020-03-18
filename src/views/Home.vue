<template>
  <div class="home">
    <h1>mapState</h1>
    <br />
    {{ count }} {{ countAlias}}  {{ countPlusLocalState }}
    <br />
    {{ num }} {{ numAlias}} {{ numPlusLocalNum }}
    <hr />

    <h1>mapGetters</h1>
    <br />
    {{ countDouble }} {{ countDoubleAlias }}
    <br />
    {{ numDouble }} {{ numDoubleAlias }}
    <hr />

    <button @click="handleClick">click</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from '../vuex';

export default {
  data () {
    return {
      localState: 90,
      localNum: 60,
    }
  },
  mounted () {
    // console.log(mapActions);
  },
  computed: {
    ...mapState(['count']),
    ...mapState({
      countAlias: 'count',
      countPlusLocalState  (state, getters) {
        return state.count + getters.countDouble + this.localState;
      }
    }),
    ...mapState('student', ['num']),
    ...mapState('student', {
      numAlias: 'num',
      numPlusLocalNum  (state, getters) {
        return state.num + getters.numDouble + this.localNum;
      }
    }),


    ...mapGetters(['countDouble']),
    ...mapGetters({
      countDoubleAlias: 'countDouble',
    }),
    ...mapGetters('student', ['numDouble']),
    ...mapGetters('student', {
      numDoubleAlias: 'numDouble',
    }),

  },
  methods: {
    ...mapMutations(['countAdd']),
    ...mapMutations({ countAddAlias: 'countAdd'}),

    ...mapMutations('student', ['numAdd']),
    ...mapMutations('student',{
      numAddAlias: 'numAdd'
    }),

    // ...mapActions(['countAddAction']),

    ...mapActions('student', ['countAddAction']),


    handleClick () {
      this.countAddAction({ num: 5 }) // this.$store.dispatch('countAddAction');

      // this.countAddAlias({num: 5}); // === this.$store.commit('countAdd', {num:5});
      // this.numAddAlias({num:5})
    }
  }
}
</script>