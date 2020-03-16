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
  data () {
    return {
      testNum: 0
    }
  },
  mounted () {
  },
  methods: {
    handleClick () {
      // this.$store.dispatch('student/countAddAction', { num : 5 });
      // this.$store.dispatch('countAddAction', { num: 5 }).then(() => {
      //   console.log('xxx');
      // });

      this.$store.dispatch({
        type: 'student/countAddAction',
        num: 10,
      })
    }
  }
}
</script>