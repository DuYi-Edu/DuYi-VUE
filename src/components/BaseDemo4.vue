<template>
  <div class="demo">
    <input type="text" v-model="query">
    <transition-group 
      tag="ul"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <li
        v-for="item in computedLists"
        :key="item.name"
      >{{ item.name }}</li>
    </transition-group>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      lists: [
        { name: 'shanshan'},
        { name: 'jicheng'},
        { name: 'chensitong'},
        { name: 'dengxuming'},
      ]
    }
  },
  computed: {
    computedLists () {
      return this.lists.filter(item => item.name.includes(this.query));
    },
  },
  methods: {
    beforeEnter (el) {
      el.style.opacity = 0;
      el.style.height = 0;
    },
    enter (el, done) {
      Velocity(el, { opacity: 1, height: '24px' }, { duration: 300, complete: done })
    },
    leave (el, done) {
      Velocity(el, { opacity: 0, height: '0px' }, { duration: 300, complete: done })
    }
  },
}
</script>

<style scoped>
li {
  height: 24px;
}
</style>