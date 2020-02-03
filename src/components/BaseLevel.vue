

<script>
// <template>
//   <h1 v-if="level === 1">
//     <slot></slot>
//   </h1>
//   <h2 v-else-if="level === 2">
//     <slot></slot>
//   </h2>
//   <h3 v-else-if="level === 3">
//     <slot></slot>
//   </h3>
//   <h4 v-else-if="level === 4">
//     <slot></slot>
//   </h4>
//   <h5 v-else-if="level === 5">
//     <slot></slot>
//   </h5>
//   <h6 v-else>
//     <slot></slot>
//   </h6>
// </template>


export default {
  props: {
    level: {
      type: Number,
      required: true,
    },
  },
  render (createElement) {
    const vNode = createElement('h'+this.level, this.$slots.default);
    console.log(vNode);
    return vNode;
  },
}

var person = {
  name: 'shanshan',
  age: 18,
  looks: 'beatifull',
}
</script>