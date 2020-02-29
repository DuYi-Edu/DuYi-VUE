<template>
  <div class="home">
    <button @click="handleClick">点击</button>
    {{ storeCount }}
    {{ countDouble }} {{ $store.getters['count/countDouble'] }}
    {{ countAdd(3) }}
    {{ obj }}
    
    <!-- <input :value="msg" @input="handleInput" /> {{ msg }} -->
    <input v-model="msg" /> {{ msg }}
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { COUNT_INCREMENT, CHANGE_OBJ, UPDATE_MSG } from '@/store/mutation-types';

export default {
  data () {
    return {
      count: 100,
    }
  },
  computed: {
    ...mapState('count', {
      storeCount: 'count',// state => state.count + 10
    }),
    ...mapState(['obj']),
    ...mapGetters('count', ['countAdd', 'countDouble']),
    msg: {
      get () {
        return this.$store.state.msg;
      },
      set (value) {
        this.$store.commit(UPDATE_MSG, { value });
      }
    },
  },
  methods: {
    // ...mapMutations(['countIncrement']),
    handleClick () {
      const num = Math.floor( Math.random() * 10 );
      this.$store.dispatch('count/countIncrement', { num }).then(() => {
        alert('count值已增加');
      })
    },
    handleInput (e) {
      this.$store.commit(UPDATE_MSG, { value: e.target.value });
    }
  },
  created () {
    console.log(this.$store.state.count);
  }
}
</script>