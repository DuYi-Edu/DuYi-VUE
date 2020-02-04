<script>
// <template>
//   <div>
//     <slot name="header"></slot>
//     demo
//     <slot></slot>
//   </div>
// </template>

// <template>
//   <div class="demo">
//     <slot :text="'HelloWorld'"></slot>
//   </div>
// </template>

export default {
  // render () {
  //   return (
  //     <div>
  //       { this.$slots.header }
  //       demo
  //       { this.$slots.default}
  //     </div>
  //   )
  // },
  render () {
    return (
      <div>
        { this.$scopedSlots.default({
          text: 'HelloWorld',
        }) }
      </div>
    )
  },
  mounted () {
    console.log( this.$scopedSlots )
  },
}
</script>