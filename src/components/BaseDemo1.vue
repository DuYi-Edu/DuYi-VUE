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
  line-height: 100px;
  text-align: center;
  border: 1px solid red;
  color: red;
}


.v-enter {
  opacity: 0;
}

.v-enter-active {
  transition: opacity 3s;
}

.v-enter-to {
  opacity: 1;
}


.v-leave {
  opacity: 1;
}

.v-leave-active {
  transition: opacity .3s;
}

.v-leave-to {
  opacity: 0;
}



</style>