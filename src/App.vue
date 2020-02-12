<template>
  <div id="app">
    <button @click="show = true">click</button>
    <async-cmp v-if="show"></async-cmp>
  </div>
</template>

<script>
// import AsyncCmp from './components/AsyncCmp';

// import();

export default {
  name: 'app',
  components: {
    AsyncCmp: () => import('./components/AsyncCmp'),
  },
  data () {
    return {
      show: false,
    }
  },
}
</script>