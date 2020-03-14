<template>
  <div class="home">
    {{ $store.state.count }}
    {{ $store.getters.countDouble }}
    <hr />
    {{ $store.state.student.num }}
    <!-- {{ $store.getters.numDouble }} -->
    {{ $store.getters['student/numDouble'] }}
    <hr />
    <button @click="handleClick">click</button>
  </div>
</template>

<script>
export default {
  mounted () {
    // console.log(this.$store.getters);
  },
  methods: {
    handleClick () {
      this.$store.commit('countAdd', { num: 5 })
      this.$store.commit({
        type: 'student/numAdd',
        payload: { num: 10 },
      })
      // this.$store.commit('student/numAdd', { num: 10})
      // this.$store.state.count ++;
      // this.$store.state.student.num ++;
    }
  }
}
</script>