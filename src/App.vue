

<script>

// <template>
//   <div id="app" class="app">
//     <!-- <base-level :level="1">标题</base-level>
//     <base-level :level="2">标题</base-level>
//     <base-level :level="3">标题</base-level>
//     <base-level :level="4">标题</base-level>
//     <base-level :level="5">标题</base-level>
//     <base-level :level="6">标题</base-level> -->
//     <!-- <base-data></base-data> -->

//     <base-slots v-slot="slotProps">
//       {{slotProps.text}}
//     </base-slots>
//   </div>
// </template>

import BaseLevel from './components/BaseLevel';
import BaseData from './components/BaseData';
import BaseSlots from './components/BaseSlots';



export default {
  name: 'app',
  components: {
    BaseLevel,
    BaseData,
    BaseSlots
  },
  render (h) {
    return h('div', {
      class: 'app',
      id: 'app',
    }, [
      h('base-slots', {
        scopedSlots: {
          default: function (props) {
            return props.text;
          }
        },
      })
    ])
  },
}
</script>

