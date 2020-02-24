export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      default: 'a',
    }
  },
  methods: {
    handleClick () {
      const mode = this.$router.mode;

      if(mode === 'hash') {
        location.hash = this.to;
      } else {
        history.pushState(null, null, this.to);
        this.$router.history.current.path = this.to;
      }
    }
  },
  render (h) {
    const data = {};
    const to = this.to;
    const mode = this.$router.mode;

    if(this.tag === 'a' && mode === 'hash') {
      const href = '#' + to;
      data.attrs = { href };
    } else {
      data.on = { click: this.handleClick };
    }

    return h(this.tag, data, this.$slots.default);
  }
};