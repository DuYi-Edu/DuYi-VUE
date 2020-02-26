<template>
  <div class="home">
    <button @click="$store.state.count ++">点击</button>
    {{ storeCount }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

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
  },
  created () {
    console.log(this.$store.state.count);
  }
}
</script>