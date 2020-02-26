<template>
  <div class="home">
    <button @click="$store.state.count ++">点击</button>
    {{ storeCount }}
    {{ countDouble }}
    {{ countAdd(3) }}
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data () {
    return {
      count: 100,
    }
  },
  computed: {
    ...mapState({
      storeCount: 'count',// state => state.count + 10
    }),
    ...mapGetters(['countAdd', 'countDouble'])
  },
  created () {
    console.log(this.$store.state.count);
  }
}
</script>