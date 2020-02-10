<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition>
      <div class="box" v-if="show">hello world</div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true,
    }
  }
}
</script>

<style scoped>
button {
  margin-bottom: 10px;
}

.box {
  width: 100px;
  height: 100px;
  margin-bottom: 10px;
  line-height: 100px;
  text-align: center;
  border: 1px solid red;
  color: red;
}

.v-enter-active {
  animation: animate 1s;
}

.v-leave-active {
  animation: animate 1s reverse;
}

@keyframes animate {
  0% {
    opacity: 0;
    transform: translateX(400px) scale(1);
  }

  50% {
    opacity: .5;
    transform: translateX(200px) scale(1.5);
  }

  100% {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
}
</style>