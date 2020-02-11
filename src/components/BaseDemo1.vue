<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition-group>
      <div key="world" v-if="show">hello wrold</div>
      <div key="shanshan" v-if="show">hello shanshan</div>
    </transition-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  }
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

.v-leave,
.v-enter-to {
  opacity: 1;
}
</style>