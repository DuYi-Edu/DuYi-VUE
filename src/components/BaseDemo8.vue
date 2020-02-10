<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition
      :duration="1000"
      appear
      appear-active-class="animated swing"
      enter-active-class="animated tada"
      leave-active-class="animated tada"
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


</style>