

<script>
// <template>
//   <div class="child">
//     {{ name }}
//     <slot name="header"></slot>
//     <slot></slot>
//   </div>
// </template>
export default {
  props: {
    name: String,
  },
  render (h) {
    return h('div', {
      class: 'child'
    }, [
      this.name,
      this.$slots.header,
      this.$slots.default
    ])
  },
}
</script>