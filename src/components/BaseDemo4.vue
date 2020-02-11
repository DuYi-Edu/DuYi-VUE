<template>
  <div class="demo">
    <button @click="handleClick">click</button>
    <transition
      mode="in-out"
    >
      <div class="box" :key="keyName">hello {{ keyName }}</div>
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

.demo {
  margin-left: 100px;
}

button {
  display: block;
}

.box {
  position: absolute;
  display: inline-block;
  width: 150px;
  height: 30px;
  margin-top: 10px;
  line-height: 30px;
  text-align: center;
  background-color: gray;
  color: #fff;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  transform: translateX(80px);
}

.v-enter-active,
.v-leave-active {
  transition: all .3s;
}

.v-enter-to  {
  opacity: 1;
  transform: translateX(0px);
}

.v-leave {
  opacity: 1;
  transform: translateX(0px);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-80px);
}

</style>