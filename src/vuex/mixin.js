function vuexInit () {
  /**
   * @desc vuex 初始化函数
   */
  const options = this.$options;

  if(options.store) {
    // Vue 根实例
    this.$store = options.store;
  } else {
    // 非 根实例
    if(options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

export default function applyMixin (Vue) {
  /**
   * @desc 添加混入
   * @param { Vue } - Vue
   */
  Vue.mixin({
    beforeCreate: vuexInit
  })
}