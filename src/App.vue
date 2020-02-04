<script>
// <template>
//   <div id="app">
//     app
//   </div>
// </template>

// <template>
//   <div>
//     <base-demo>
//       <template #default>  v-slot:default
//         <div>默认插槽</div>
//       </template>

//       <template #header>
//         <div>具名header插槽</div>
//       </template>
//     </base-demo>
//   </div>
// </template>

// <template>
//   <div>
//     <base-demo v-slot="{ text }">
//       {{ text }}
//     </base-demo>
//   </div>
// </template>

// JSX == JS + XML(html)

// <html> {js}
import BaseDemo from './components/BaseDemo';

export default {
  name: 'app',
  data () {
    return {
      value: 'hello world',
      show: !true,
      num: 5,
      content: 'shanshan',
    }
  },
  components: {
    BaseDemo
  },
  methods: {
    vIf () {
      if(this.num === 1) {
        return <div>1</div>
      } else if(this.num === 2) {
        return <span>2</span>
      } else {
        return <p>{ this.num }</p>
      }
    },
    handleClick (num) {
      // console.log('clikc');
      console.log(num);
    },
  },
  render () {
    const scopedSlots = {
      scopedSlots: {
        default: props => <span>{ props.text }</span>,
      }
    };

    return (
      <h1>
        { this.value }
        <div domPropsInnerHTML="<a>href</a>"></div>
        <div domPropsTextContent="<a>href</a>"></div>
        <div v-show={this.show}>show</div>
        { true && <div>if</div>}
        { !true ? <div>div</div> : <span>span</span> }
        { this.vIf() }
        <ul>
          { [1, 2, 3].map(item => <li ref="li" refInFor={true} key={item}>{item}</li>)}
        </ul>
        <div onClick={() => { this.handleClick(1) }}>点我</div>
        <base-demo nativeOnClick={this.handleClick}/>
        <div class={['a', 'b']} style={{fontSize: '14px', color: 'red'}}>v-bind</div>
        <input ref="input" v-model={this.content}/>
        { this.content }
        <base-demo>
          <div slot="default">默认插槽</div>
          <div slot="header">具名header插槽</div>
        </base-demo>
        <base-demo {...scopedSlots}>
        </base-demo>
      </h1>
    )
  },
  mounted () {
    console.log(this.$refs);
  },
}
</script>