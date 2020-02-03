<script>
export default {
  data () {
    return {
      msg: 'hello world',
    }
  },
  render (h) {
    return h('div', [
      this.$scopedSlots.default({
        text: this.msg,
      })
    ])
  }
}
</script>