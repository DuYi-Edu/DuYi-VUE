<template>
  <div class="demo">
    <button @click="handleClick">click</button>
    <transition
      mode="out-in"
    >
      <div :key="keyName">hello {{ keyName }}</div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      keyName: 'world'
    }
  },
  methods: {
    handleClick () {
      const isWorld = this.keyName === 'world';
      this.keyName = isWorld ? 'shanshan' : 'world';
    },
  },
}
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all .3s;
}

.v-enter-to,
.v-leave {
  opacity: 1;
}


</style>