<template functional>
  <div>
    {{ props.level }}
    <slot :text="'hello'"></slot>
  </div>
</template>

<script>
export default {
  functional: true,
  inject: ['name'],
  props: {
    level: {
      type: Number,
      required: true,
    }
  },
  render (h, context) {

    const { props, slots, scopedSlots, data, parent, listeners, injections, children } = context;
    const tag = 'h' + props.level;

    console.log(children);

    return (
      <tag>
        { 
          // slots().default 
        }
        { scopedSlots.header({ text: '具名插槽'}) }
        { scopedSlots.default({ text: '默认插槽'}) }
        { injections.name }

      </tag>
    )
  },
}
</script>