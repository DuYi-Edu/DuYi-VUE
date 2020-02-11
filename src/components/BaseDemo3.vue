<template>
  <div class="demo">
    <input type="text" v-model="query">
    <transition-group tag="ul">
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
}
</script>

<style scoped>
li {
  height: 24px;
}

.v-enter,
.v-leave-to {
  opacity: 0;
  height: 0px;
}

.v-leave-active,
.v-enter-active {
  transition: all .3s;
}

.v-enter-to,
.v-leave {
  opacity: 1;
  height: 24px;
}
</style>