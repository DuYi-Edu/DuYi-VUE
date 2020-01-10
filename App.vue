
<template>
  <div>
    xxx
    {{ msg }}
    <p>我是app 组件的 p元素</p>
    <base-son />
  </div>
</template>

<script>
// 一个组件

// 结构、样式、行为

// html、css、js

// Vue.component('my-cmp', {
//   template: `<><>`
// })
import baseSon from './Son';

export default {
  components: {
    baseSon
  },
  data () {
    return {
      msg: 'hello world',
    }
  },
}
</script>

<style>
div {
  background-color: red;
}
</style>