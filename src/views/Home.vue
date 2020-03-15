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
    // console.log(this.$store.getters);

    // this.$watch(function () {
    //   return this.testNum;
    // }, () => {
    //   console.log('change');
    // })

    // setTimeout(() => {
    //   this.testNum ++;
    //   this.testNum ++;
    //   this.testNum ++;
    //   this.testNum ++;
    // }, 1000)
  },
  methods: {
    handleClick () {
      this.$store.commit('countAdd', { num: 5 });
      this.$store.commit({
        type: 'student/numAdd',
        num: 10,
      })
      this.$store.commit('student/numAdd', { num: 10 });
      // this.$store.state.count ++;
      // this.$store.state.student.num ++;
    }
  }
}
</script>