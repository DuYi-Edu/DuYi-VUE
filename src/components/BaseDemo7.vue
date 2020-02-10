<template>
  <div class="demo">
    <button @click="show = !show">click</button>
    <transition name="box" :duration="{enter: 4000, leave: 6000}">
      <div class="box" v-show="show">
        <transition name="span">
          <span v-if="show">hello world</span>
        </transition>
      </div>
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

.box-enter,
.box-leave-to {
  /* opacity: 0; */
  transform: translateX(200px);
}

.box-enter-active,
.box-leave-active {
  transition: all 2s;
}

.box-enter-to,
.box-leave {
  /* opacity: 1; */
  transform: translateX(0px);
}

.span-enter,
.span-leave-to {
  font-size: 12px;
}

.span-enter-active,
.span-leave-active {
  transition: all 2s 2s;
}

.span-enter-to,
.span-leave {
  font-size: 16px;
}
</style>