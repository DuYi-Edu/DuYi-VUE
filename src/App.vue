<template>
  <div id="app">
    <button @click="show = !show">click</button>
    <!-- <transition-single>
      <div v-if="show">hello world</div>
    </transition-single>

    <transition-single>
      <div v-if="show">hello shanshan</div>
    </transition-single> -->

    <transition-single>
      <div key="world" v-if="show">hello shanshan</div>
      <div key="shanshan" v-else>hello world</div>
    </transition-single>
  </div>
</template>

<script>
import TransitionSingle from './components/TransitionSingle';

export default {
  name: 'app',
  components: {
    TransitionSingle
  },
  data () {
    return {
      show: true,
    }
  },
}
</script>