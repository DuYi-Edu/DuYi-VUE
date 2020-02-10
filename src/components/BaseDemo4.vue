<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
      enter-active-class="animated bounceInRight"
      leave-active-class="animated bounceOutDown"
    >
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


.enter {
  opacity: 0;
}

.enter-active {
  transition: opacity 3s;
}

.enter-to {
  opacity: 1;
}
</style>