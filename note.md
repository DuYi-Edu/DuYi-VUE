[toc]
# 课程准备
- 所有代码及文件放到github上进行托管，同学们自行clone
- github地址：https://github.com/DuYi-Edu/DuYi-VUE
- 下载并安装vue-devtools插件
- 由于某些原因，下载不了谷歌商店上的插件，所以做好科学上网
- 安装插件：https://github.com/qin-ziqi/Chrome-SetupVPN-3.7.0 ，跟着上面的步骤做，插件安装较慢，据不完全统计，约需30分钟
- 安装好了后，点击谷歌浏览器的更多工具 -> 扩展程序 -> 打开chrome网上应用商店 -> 搜索vue devtools -> 添加至chrome
- 是否生效？访问：https://www.bilibili.com/ ，图标变绿了就生效了
- 有什么用？以后再说，听我的，安装
- 课程笔记会给你们，所以在学习课程的时候，认真听，认真思考
- 安装vscode 插件：Markdown Preview Enhanced
- 课程会先讲解vue语法，先把vue语法学会了之后，在剖析其他的问题

# 开始使用Vue
  1. 引入vue.js
      > 官网：vuejs.org

      > 开发版本：包含完整的警告和调试模式
      
      > 生产版本：删除了警告，体积更小

  2. 引入vue.js后，给我们提供了一个构造函数 Vue
  3. 在js中，`new Vue()`
  4. `new Vue()` 后会返回一个vue实例对象，我们用变量接着它
  5. `const vm = new Vue()`
  6. 传递一个配置对象{} -- > `const vm = new Vue({})`

## el
  > 类型： 字符串

  > 全称：element（元素）

  > 作用：配置控制的元素，表示Vue要控制的区域，值为css选择器
  ``` html
    <!-- 被Vue控制的区域，我们称之为模板 -->
    <div id="app"></div>
  ```
  ```js
    const vm = new Vue({
      el: '#app' // 控制id为app的元素
    })
  ```

## $mount
- 作用和el一致，都是配置控制的元素，使用哪个都可以，二选一
  ``` html
    <div id="app"></div>
  ```
  ```js
    const vm = new Vue({})
    vm.$mount('#app');
  ```
- 问：和el有什么不同？
  > 答：本质上没什么不同，$mount为手动挂载，在项目中有时要进行延迟挂载，比如有时要在挂载之前进行一些其他的操作，比如判断等等（但是，这样做的时候很少，比邓哥回家的次数还少，emmmmm）

## data
- 类型：对象
- 作用：存放要用到的数据，数据为响应式的
  ```js
    const vm = new Vue({
      el: '#app',
      data: {
        'mrDeng': '风姿绰约、花枝招展'
      }
    })
  ```
## 插值表达式
- 使用方法： {{ }}
- 可以将vue中的数据填在插值表达式中，如：
  ``` html
    <div id="app">{{ mrDeng }}</div>
  ```
  ```js
    const vm = new Vue({
      el: '#app',
      data: {
        mrDeng: '邓哥：风姿绰约、花枝招展'
      }
    })
  ```

- 除了填写data之外，还可以直接填写数据值（数字、字符串、布尔值、undefined、null、数组、对象），如:
  ``` html
    <div id="app">
      {{ 5201314 }}
      {{ '婀娜多姿、亭亭玉立' }}
      {{ true }}
      {{ ['邓旭明', '小刘', '王小宝'] }}
      {{ {name: '邓旭明', age: 80, height: '140cm', weight: '100kg'} }}
    </div>
  ```
- 注意：在插值表达式中直接书写对象类型值时，不要将三个{}连在一起，这样会报错，如：
  ``` html
    <div id="app">
      <!-- 这样可是不行滴 -->
      {{{name: '邓旭明', age: 80, height: '140cm', weight: '100kg'}}} 
    </div>
  ```
- 还可在插值表达式中写表达式，如：
  ``` html
    <div id="app">
      <!-- 运算表达式 -->
      {{ 'you' + 'me' }}
      {{ 10 - 5 }}
      {{ 100 * 7 }}
      {{ 1000 / 12 }}
      <!-- 逻辑表达式 -->
      {{ liu || li }}
      {{ deng && liu }}
      {{ !wang }}
      <!-- 三元表达式 -->
      {{ 1 + 1 === 3 ? '邓旭明' : '正常人' }}
      <!-- 函数调用也是表达式，也可以使用,这个以后再学哈... -->
    </div>
  ```

- 还可以填写其他的吗？不可以，No，以下这些都是不行滴：
  ``` html
    <div id="app">
      <!-- 这是语句，不可以写在插值表达式中 -->
      {{ var Deng = 'shuaige'; console.log(deng) }}
      <!-- 流程控制也不可以 -->
      {{ if(Deng.looks === 'shuai'){ console.log('不可能')} }}
    </div>
  ```

- <font color=#ba55d3>记住</font>：插值表达式中，可以写：data、js数据、表达式，其他的想都不要想。

- <font color=#ff4500>注意</font>，只要插值表达式中使用了数据，必须在data中声明过，否则会报错
  ``` html
    <!-- 此时就报错啦，因为mrCheng，未在data中声明过 -->
    <div id="app">
      {{ mrCheng }}
    </div>
  ```
  ```js
    const vm = new Vue({
      el: '#app',
      data: {
        mrDeng: '邓哥：风姿绰约、花枝招展'
      }
    })
  ```

- 还有另外一种可能，使用了未被声明过的数据，不报错：
  ``` html
    <!-- 此时不报错啦，why？ -->
    <!-- 在作用域上找不到，报错 -->
    <!-- 在原型链上找不到，值为undefined -->
    <!-- undefined为js基本类型值，所以就不报错啦 -->
    <div id="app">
      {{ mrDeng.wife }}
    </div>
  ```
  ```js
    const vm = new Vue({
      el: '#app',
      data: {
        mrDeng: {
          name: '邓旭明', 
          age: 80, 
          height: '140cm', 
          weight: '100kg'
        }
      }
    })
  ```

# vue的响应式-1
- 数据变化，页面就会重新渲染

- 怎么更改数据？so easy
``` html
  <div id="app">
    {{ mrDeng }}
  </div>
```
``` js
  const vm = new Vue({
    el: '#app',
    data: {
      mrDeng: '邓哥：风姿绰约、花枝招展'
    }
  });
  vm.mrDeng = '手如柔荑、肤如凝脂'; // 见证奇迹的时刻，页面变化啦
```
- 问：为什么data会直接出现在vm实例对象中咧？
> 答：当创建vue实例时，vue会将data中的成员代理给vue实例，目的是为了实现响应式，监控数据变化，执行某个监听函数（怎么实现的？想一想，提示：Object.defineProperty，试着实现一下）

- 问：实例中除了data数据外，其他东西是啥子？
> 为了防止名称冲突。因为会将data中数据代理给vue，假如说我们自己写的data名称和vue中自带的属性冲突了，那么就会覆盖vue内部的属性，所以vue会把自己内部的属性成员名称前加上\$或\_，如果加上的是\$，代表是我们可以使用的，如果加上的是\_，是vue自己内部使用的方法或属性，我们不需要调用

- 更改的数据必须是存在的数据，否则不能重新渲染页面，因为他监听不到，如：
``` html
  <!-- 即使更改了数据，也不会重新渲染页面 -->
  <div id="app">
    {{ mrDeng.wife }} 
  </div>
```
```js
  const vm = new Vue({
    el: '#app',
    data: {
      mrDeng: {
        name: '邓旭明', 
        age: 80, 
        height: '140cm', 
        weight: '100kg'
      }
    }
  })

  vm.mrDeng.wife = 'liu';
```

- 更改的数据必须已渲染过的数据，否则从性能角度考虑，不会重新渲染页面，如：
``` html
  <!-- 即使更改了数据，也不会重新渲染页面 -->
  <div id="app">
    {{ mrDeng.wife }} 
  </div>
```
```js
  const vm = new Vue({
    el: '#app',
    data: {
      msg: '邓哥：风姿绰约、花枝招展',
      mrDeng: {
        name: '邓旭明', 
        age: 80, 
        height: '140cm', 
        weight: '100kg'
      }
    }
  })

  vm.mrDeng.wife = 'liu';
  vm.msg = '邓哥：手如柔荑、肤如凝脂';
```

- 更改数据后，页面会立刻重新渲染吗？
> vue更新DOM的操作是异步执行的，只要侦听到数据变化，将开启一个异步队列，如果一个数据被多次变更，那么只会被推入到队列中一次，这样可以避免不必要的计算和DOM操作。

> 同步执行栈执行完毕后，会执行异步队列

```html
<div id="app">{{ msg }}</div>
```
``` js
const vm = new Vue({
  el: '#app',
  data: {
    msg: '杉杉'
  }
})
vm.msg = '杉杉超美的';
console.log(vm.msg); // 杉杉超美的，此时数据已更改
console.log(vm.$el.innerHTML); // 杉杉。此时页面还未重新渲染
```
## vm.$el
- 值为被Vue控制的元素（或者说，Vue挂载的元素）

## vm.$nextTick & Vue.nextTick
- 如何在更改数据后，看到渲染后的页面上的值？
> 答：利用vm.\$nextTick或Vue.nextTick，在页面重新渲染，DOM更新后，会立刻执行vm.$nextTick
```html
<div id="app">{{ msg }}</div>
```
``` js
const vm = new Vue({
  el: '#app',
  data: {
    msg: '杉杉'
  }
})
vm.msg = '杉杉超美的';
console.log(vm.msg); // 杉杉超美的，此时数据已更改
// 1. 使用vm.$nextTick
vm.$nextTick(() => {
  console.log(vm.$el.innerHTML); // 杉杉超美的
})
// 2. 使用Vue.nextTick
Vue.nextTick(() => {
  console.log(vm.$el.innerHTML); // 杉杉超美的
})
```
- vm.nextTick和Vue.nextTick还可以作为Promise使用
```html
<div id="app">{{ msg }}</div>
```
``` js
const vm = new Vue({
  el: '#app',
  data: {
    msg: '杉杉'
  }
})
vm.msg = '杉杉超美的';
// 1. 使用vm.$nextTick
vm.$nextTick().then(() => {
  console.log(vm.$el.innerHTML); // 杉杉超美的
})
// 2. 使用Vue.nextTick
Vue.nextTick().then(() => {
  console.log(vm.$el.innerHTML); // 杉杉超美的
})
```

- vm.$nextTick 和 Vue.nextTick的区别？
> Vue.nextTick内部函数的this指向window
```js
  Vue.nextTick(function () {
    console.log(this); // window
  })
```
> vm.\$nextTick内部函数的this指向Vue实例对象
```js
  vm.$nextTick(function () {
    console.log(this); // vm实例
  })
```

- 好奇nextTick是怎么实现的吗？
- 异步任务分为宏任务（macro）和微任务（micro）
- 宏任务比较慢（如setTimeout等），微任务比较快（如Promise.then()等）
- 微任务在前，宏任务在后（eventloop，事件环）
  ```js
    // 控制台打印顺序：promise > timeout
    setTimeout(() => {
      console.log('timeout');
    }, 0)  
    Promise.resolve().then(() => {
      console.log('promise');
    })
  ```
- 在nextTick的实现源码中，会先判断是否支持微任务，不支持后，才会执行宏任务
  ```js
    if(typeof Promise !== 'undefined') {
      // 微任务
      // 首先看一下浏览器中有没有promise
      // 因为IE浏览器中不能执行Promise
      const p = Promise.resolve();

    } else if(typeof MutationObserver !== 'undefined') {
      // 微任务
      // 突变观察
      // 监听文档中文字的变化，如果文字有变化，就会执行回调
      // vue的具体做法是：创建一个假节点，然后让这个假节点稍微改动一下，就会执行对应的函数
    } else if(typeof setImmediate !== 'undefined') {
      // 宏任务
      // 只在IE下有
    } else {
      // 宏任务
      // 如果上面都不能执行，那么则会调用setTimeout
    }
  ```
- 曾经vue用过的宏任务
  - MessageChannel 消息通道 宏任务

# vue的响应式-2
- 除了未被声明过和未被渲染的数据外，还有什么数据更改后不会渲染页面？
  > 1.&nbsp;利用索引直接设置一个数组项时：
  ```html
  <!-- 即使向数组中添加了第4项，数组仍然显示3项 -->
  <!-- 咳咳，一家三口，有第4个人也不能摆出来给大家看呀~ -->
  <div id="app">{{ list }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      dengFamily: ['邓哥', '小刘', '王小宝']
    }
  })
  vm.dengFamily[3] = '铁锤妹妹'; // 不是响应式的
  ```

  > 2.&nbsp;修改数组的长度时：
  ```html
  <!-- 更改了数组长度后，数组仍然显示1项 -->
  <div id="app">{{ list }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      dengWife: ['小刘']
    }
  })
  vm.dengWife.length = 0; // 不是响应式的
  ```

  > 3.&nbsp;添加或删除对象：
  ```html
  <!-- 身高还是那个身高，媳妇也只有一个，不要痴心妄想 -->
  <div id="app">{{ deng }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      deng: {
        wife: '小刘',
        son: '王小宝',
        weight: '100kg',
        height: '140cm',
        age: 60
      }
    }
  })
  vm.deng.secondWife = '铁锤妹妹'; // 不是响应式的
  delete vm.deng.height; // 不是响应式的
  ```
- 问：要如何响应式的更新数组和对象？
  > 更改数组：<br> 1. 利用数组变异方法：push、pop、shift、unshift、splice、sort、reverse <br> 2. 利用vm.\$set/Vue.set实例方法<br>3. 利用vm.\$set或Vue.set删除数组中的某一项

  > vm.\$set是Vue.set的别名<br>使用方法：Vue.set(object, propertyName, value)，也就是这个意思：Vue.set(要改谁，改它的什么，改成啥)

  > vm.\$delete是Vue.delete的别名<br>使用方法：Vue.delete(object, target)，也就是这个意思：Vue.delete(要删除谁的值，删除哪个)

  ```html
  <!-- 从此，一家三口过上了愉快生活 -->
  <div id="app">{{ list }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      dengFamily: ['邓哥', '小刘', '王小宝']
    }
  })
  // 使用数组变异方法
  vm.dengFamily.push('铁锤妹妹');
  // 使用vm.$set
  vm.$set(vm.dengFamily, 3, '铁锤妹妹');
  
  ```

  ```html
  <!-- 邓哥的媳妇多了起来~ -->
  <div id="app">{{ list }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      dengWife: ['小刘']
    }
  })
  // 更改长度时，可以用数组的splice方法
  vm.dengWife.splice(100); 
  ```
  > 更改对象：<br>1. 添加利用vm.\$set/Vue.set实例方法<br>2. 删除利用vm.\$delete/Vue.delete方法

  ```html
  <div id="app">{{ deng }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      deng: {
        wife: '小刘',
        son: '王小宝',
        weight: '100kg',
        height: '140cm',
        age: 60
      }
    }
  })
  // 添加
  vm.$set(vm.deng, 'secondWife', '铁锤妹妹');
  // 删除
  vm.$delete(vm.deng, 'height')
  ```

- 总结：
  > 更改数组用变异方法，就够了
  > 更改对象就用vm.\$set和vm.\$delete

- 问题解决了，但是为什么会这样呢？
  > Object.defineProperty的锅，咱们下节课说~

# 扩展_剖析Vue响应式原理
```js
const data = {
  name: 'shanshan',
  age: 18,
  shan: {
    name: 'shanshan',
    age: 18,
    obj: {}
  },
  arr: [1, 2, 3]
}

const arrayProto = Array.prototype;
const arrayMethods = Object.create(arrayProto);
['push', 'pop', 'shift', 'unshift' ,'sort', 'splice', 'reverse'].forEach(method => {
  arrayMethods[method] = function () {
    arrayProto[method].call(this, ...arguments);
    render();
  }
})

function defineReactive (data, key, value) {
  observer(value);
  Object.defineProperty(data, key, {
    get () {
      return value;
    },
    set (newVal) {
      if(value === newVal) {
        return;
      }
      value = newVal;
      render();
    }
  })
}

function observer (data) {
  if(Array.isArray(data)) {
    data.__proto__ = arrayMethods;
    return;
  }

  if(typeof data === 'object') {
    for(let key in data) {
      defineReactive(data, key, data[key])
    }
  }
}

function render () {
  console.log('页面渲染啦');
}

function $set (data, key, value) {
  if(Array.isArray(data)) {
    data.splice(key, 1, value);
    return value;
  }
  defineReactive(data, key, value);
  render();
  return value;
}

function $delete(data, key) {
  if(Array.isArray(data)) {
    data.splice(key, 1);
    return;
  }
  delete data[key];
  render();
}

observer(data);
```
> 利用Object.defineProperty实现响应式的劣势
1. 天生就需要进行递归
2. 监听不到数组不存在的索引的改变
3. 监听不到数组长度的改变
4. 监听不到对象的增删

# Vue相关指令
- 具有特殊含义、拥有特殊功能的特性
- 指令带有v-前缀，表示它们是Vue提供的特殊特性
- 指令可以直接使用data中的数据

## v-pre
- 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。跳过大量没有指令的节点会加快编译。
  ```html
  <!-- 不会被编译 -->
  <span v-pre>{{ msg }}</span>
  ```

## v-cloak
- 这个指令保持在元素上直到关联实例结束编译
- 可以解决闪烁的问题
- 和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕

  ```css
  [v-cloak] {
    display: none;
  }
  ```
  ```html
  <!-- {{ message }}不会显示，直到编译结束 -->
  <div v-cloak>
    {{ message }}
  </div>
  ```

## v-once
- 只渲染元素一次。随后的重新渲染，元素及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能
  ```html
  <!-- 单个元素 -->
  <span v-once>{{msg}}</span>
  <!-- 有子元素 -->
  <div v-once>
    <h1>comment</h1>
    <p>{{msg}}</p>
  </div>
  ```

## v-text
- 更新元素的 textContent
  ```html
  <span v-text="msg"></span>
  <!-- 和下面的一样 -->
  <span>{{msg}}</span>
  ```

> v-text VS Mustache
- v-text替换元素中所有的文本，Mustache只替换自己，不清空元素内容
  ```html
  <!-- 渲染为：<span>杉杉最美</span> -->
  <span v-text="msg">----</span>
  <!-- 渲染为：<span>----杉杉最美----</span> -->
  <span>----{{msg}}----</span>
  ```
- v-text 优先级高于 {{ }}

> textContent VS innerText
1. 设置文本替换时，两者都会把指定节点下的所有子节点也一并替换掉。
2. textContent 会获取所有元素的内容，包括 ```<script>``` 和 ```<style> ```元素，然而 innerText 不会。
3. innerText 受 CSS 样式的影响，并且不会返回隐藏元素的文本，而textContent会。
4. 由于 innerText 受 CSS 样式的影响，它会触发重排（reflow），但textContent 不会。
5. innerText 不是标准制定出来的 api，而是IE引入的，所以对IE支持更友好。textContent虽然作为标准方法但是只支持IE8+以上的浏览器，在最新的浏览器中，两个都可以使用。
6. 综上，Vue这里使用textContent是从性能的角度考虑的。

  > 测试一下innerText & textContent两者性能

  ```html
  <ul class="list">
    <li>1</li>
    <!-- 此处省略998个 -->
    <li>1000</li>
  </ul>
  ```
  ```js
  const oList = document.getElementById("list");

  console.time("innerText");
  for(let i = 0; i < oList.childElementCount; i++){
    ul.children[i].innerText="innerText";
  }
  console.timeEnd("innerText");

  console.time("textContent");
  for(let i = 0; i < oList.childElementCount; i++){
    ul.children[i].textContent="innerText";
  }
  console.timeEnd("textContent");
  ```
  

## v-html
- 更新元素的innerHTML
- ***注意***：内容按普通 HTML 插入，不会作为 Vue 模板进行编译 
- 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，永不用在用户提交的内容上。
  ```html
  <input type="text" />
  <button>点击</button>
  <div id="app">
    <div v-html="msg"></div>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    data: {
      msg: 'hello world'
    }
  })

  const oInput = document.getElementsByTagName('input')[0];
  const oButton = document.getElementsByTagName('button')[0];
  let msg = null;
  oButton.onclick = function () {
    vm.msg = oInput.value;
  }
  ```
  
# 条件渲染

## v-if
- 用于条件性地渲染一块内容。这块内容只会在指令的表达式返回 truthy 值的时候被渲染。

> 切换多个元素
- 因为 v-if 是一个指令，所以必须将它添加到一个元素上，但是如果想切换多个元素呢？此时可以把一个 ```<template>``` 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 ```<template>``` 元素
  ```html
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
  ```

## v-else
- 为 v-if 或者 v-else-if 添加“else 块”。
- ***注意***：前一兄弟元素必须有 v-if 或 v-else-if
  ```html
  <div v-if="Math.random() > 0.5">
    杉杉
  </div>
  <div v-else>
    你看不见杉杉啦
  </div>
  ```

## v-else-if
- 表示 v-if 的 “else if 块”。可以链式调用。
- ***注意***：前一兄弟元素必须有 v-if 或 v-else-if
  ```html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```
## v-show
- 根据表达式之真假值，切换元素的 display CSS 属性。
  ```html
  <h1 v-show="ok">Hello!</h1>
  ```

## v-if VS v-show
1. v-if 是惰性的，如果在初始渲染时条件为假，则什么也不做，直到条件第一次变为真时，才会开始渲染条件块。v-show则不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。
2. v-if 有更高的切换开销，v-show 有更高的初始渲染开销，如果需要非常频繁地切换，则使用 v-show 较好，如果在运行时条件很少改变，则使用 v-if 较好
3. v-show不支持```<template>```元素
4. v-show不支持v-else/v-else-if

# v-bind 指令
- 动态地绑定一个或多个特性
- :后的为传递的参数
  ```html
  <!-- 绑定一个属性 -->
  <img v-bind:src="imageSrc">

  <!-- 动态特性名 (2.6.0+) -->
  <button v-bind:[key]="value"></button>

  <!-- 缩写 -->
  <img :src="imageSrc">

  <!-- 动态特性名缩写 (2.6.0+) -->
  <button :[key]="value"></button>

  <!-- 内联字符串拼接 -->
  <img :src="'/path/to/images/' + fileName">
  ```
- 没有参数时，可以绑定到一个包含键值对的对象。注意此时 class 和 style 绑定不支持数组和对象。
  ```html
  <!-- 绑定一个有属性的对象 -->
  <div v-bind="{ id: someProp, 'other-attr': otherProp }"></div>
  ```
- 由于字符串拼接麻烦且易错，所以在绑定 class 或 style 特性时，Vue做了增强，表达式的类型除了字符串之外，还可以是数组或对象。

  - 绑定class
    - 对象语法
      ```html
      <div v-bind:class="{ red: isRed }"></div>
      ```
      上面的语法表示 active 这个 class 存在与否将取决于数据属性 isActive 的 真假。

    - 数组语法
      我们可以把一个数组传给 v-bind:class，以应用一个 class 列表
      ```html
      <div v-bind:class="[classA, classB]"></div>
      ```
    - 在数组语法总可以使用三元表达式来切换class
      ```html
      <div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
      ```
    - 在数组语法中可以使用对象语法
      ```html
        <div v-bind:class="[classA, { classB: isB, classC: isC }]">
        <div v-bind:class="classA" class="red">
      ```
    - v-bind:class 可以与普通 class 共存
      ```html
        <div v-bind:class="classA" class="red">
      ```
    
  - 绑定style
    - 使用对象语法
      看着比较像CSS，但其实是一个JavaScript对象
      CSS属性名可以用驼峰式(camelCase)或者短横线分隔(kebab-case)来命名
      但是使用短横线分隔时，要用引号括起来
      ```html
      <div v-bind:style="{ fontSize: size + 'px' }"></div>
      ```
      ```js
      data: {
        size: 30
      }
      ```
      也可以直接绑定一个样式对象，这样模板会更清晰：
      ```html
      <div v-bind:style="styleObject"></div>
      ```
      ```js
      data: {
        styleObject: {
          fontSize: '13px'
        }
      }
      ```
    - 使用数组语法
      数组语法可以将多个样式对象应用到同一个元素
      ```html
      <div v-bind:style="[styleObjectA, styleObjectB]"></div>
      ```
    - 自动添加前缀
      绑定style时，使用需要添加浏览器引擎前缀的CSS属性时，如 transform，Vue.js会自动侦测并添加相应的前缀。
    - 多重值
      从 2.3.0 起你可以为 style 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值:
      ```html
      <div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
      ```
      这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 display: flex。
    
- 缩写: ```:```
- 修饰符：
  修饰符 (modifier) 是以英文句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。
  - .camel
    由于绑定特性时，会将大写字母转换为小写字母，如：
    ```html
    <!-- 最终渲染的结果为：<svg viewbox="0 0 100 100"></svg> -->
    <svg :viewBox="viewBox"></svg>
    ```
    所以，Vue提供了v-bind修饰符 camel，该修饰符允许在使用 DOM 模板时将 v-bind 属性名称驼峰化，例如 SVG 的 viewBox 属性
    ```html
    <svg :view-box.camel="viewBox"></svg>
    ```

  - .prop
    被用于绑定 DOM 属性 (property)
    ```html
    <div v-bind:text-content.prop="text"></div>
    ```
    
  - .sync
    讲解组件时再说

# v-on指令
- v-on 指令可以监听 DOM 事件，并在触发时运行一些 JavaScript 代码
- 事件类型由参数指定
  ```html
  <div id="app">
    <button v-on:click="counter += 1">点击加 1</button>
    <p>按钮被点击了 {{ counter }} 次</p>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: 'app',
    data: {
      counter: 0
    }
  })
  ```
- 但是很多事件处理逻辑是非常复杂的，所以直接把 JavaScript 代码写在 v-on 指令中是不可行的。所以 v-on 还可以接收一个需要调用的方法名称。
  ```html
  <div id="app">
    <!-- `addCounter` 是在下面定义的方法名 -->
    <button v-on:click="addCounter">点击加 1</button>
    <p>按钮被点击了 {{ counter }} 次</p>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    data: {
      counter: 0
    },
    // 在 methods 对象中定义方法
    methods: {
      addCounter: function (e) {
        // this 在方法里指向当前 Vue 实例
        this.counter += 1；
        // e 是原生 DOM 事件
        cosnole.log(e.target)；
      }
    }
  })
  ```
- methods中的函数，也会直接代理给Vue实例对象，所以可以直接运行：
  ```js
    vm.addCounter();
  ```
- 除了直接绑定到一个方法，也可以在内联JavaScript 语句中调用方法：
  ```html
  <div id="app">
    <button v-on:click="addCounter(5)">点击加 5</button>
    <p>按钮被点击了 {{ counter }} 次</p>
  </div>
  ```
  ```js
  new Vue({
    el: '#app',
    data: {
      counter: 0
    },
    methods: {
      addCounter: function (num) {
        this.counter += 5;
      }
    }
  })
  ```
- 在内联语句中使用事件对象时，可以利用特殊变量 $event:
   ```html
  <div id="app">
    <button v-on:click="addCounter(5, $event)">点击加 5</button>
    <p>按钮被点击了 {{ counter }} 次</p>
  </div>
  ```
  ```js
  new Vue({
    el: '#app',
    methods: {
      addCounter: function (num, e) {
        this.counter += 5;
        cosnole.log(e.target)；        
      }
    }
  })
  ``` 

- 可以绑定动态事件，Vue版本需要2.6.0+
  ```html
  <div v-on:[event]="handleClick">点击，弹出1</div>  
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    data: {
      event: 'click'
    },
    methods: {
      handleClick () {
        alert(1);
      }
    }
  })
  ```
- 可以不带参数绑定一个对象，Vue版本需要2.4.0+。
  - { 事件名：事件执行函数 }
  - 使用此种方法不支持函数传参&修饰符
  ```html
  <div v-on="{ mousedown: doThis, mouseup: doThat }"></div>
  ```
- v-on指令简写：```@```

## 为什么在 HTML 中监听事件?
1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们

# v-on指令的修饰符

## 事件修饰符

### .stop
- 调用 event.stop，阻止事件冒泡
  ```html
  <!-- 此时只弹出button -->
  <div id="app">
    <div @click="alert('div')">
      <button @click.stop="alert('button')">点击</button>
    </div>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      alert(str) { alert(str); }
    }
  })
  ```
### .prevent
- 调用 event.preventDefault()，阻止默认事件
  ```html
  <!-- 点击提交按钮后，页面不会重载 -->
  <div id="app">
    <form v-on:submit.prevent="onSubmit">
      <input type="submit">
    </form>
    <!-- 也可以只有修饰符 -->
    <form v-on:submit.prevent>
      <input type="submit">
    </form>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      onSubmit() { console.log('submit'); }
    }
  })
  ```
### .capture
- 事件捕获模式
  ```html
  <!-- 此时先弹出div再弹出button -->
  <div id="app">
    <div @click.capture="alert('div')">
      <button @click="alert('button')">点击</button>
    </div>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      alert(str) { alert(str) }
    }
  })  
  ```
### .self
- 只当事件是从侦听器绑定的元素本身触发时才触发回调
  ```html
  <!-- 点击button时，只弹出 button -->
  <div id="app">
    <div id="app">
      <div :style="{ backgroundColor: 'red' }" 
      @click.self="alert('div')">
        <button @click="alert('button')">点击</button>
      </div>
    </div>
  </div>
  ```

  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      alert(str) { alert(str) }
    }
  })
  ```  
### .once 
- 只触发一次回调
- 2.1.4新增
  ```html
  点击两次button按钮，只弹出一次button
  <div id="app">
    <button @click.once="alert('button')">点击</button>
  </div>
  ```

  ```js
  const vm = new Vue({
    el: '#app',
    methods: {
      alert(str) { alert(str) }
    }
  })
  ```
### .passive
- 设置 addEventListener 中的 passive 选项
- 能够提升移动端的性能
- 2.3.0新增
> why passive？
- 即使在触发触摸事件时，执行了一个空的函数，也会让页面卡顿。因为浏览器不知道监听器到底会不会阻止默认事件，所以浏览器要等到执行完整个函数后，才能决定是否要滚动页面。passive事件监听器，允许开发者告诉浏览器，监听器不会阻止默认行为，从而浏览器可以放心大胆的滚动页面，这样可以大幅度提升移动端页面的性能，因为据统计只有20%的触摸事件会阻止默认事件。
- .passive 会告诉浏览器你不想阻止事件的默认行为

### 注意
1. 使用修饰符时，顺序很重要。相应的代码会以同样的顺序产生。因此，
  v-on:click.prevent.self 会阻止所有的点击的默认事件
  v-on:click.self.prevent 只会阻止对元素自身点击的默认事件
2. 不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。

## 按键修饰符
在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 v-on 在监听键盘事件时添加按键修饰符
```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```
你可以直接将 [KeyboardEvent.key](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。
```html
<input v-on:keyup.page-down="onPageDown">
```
在上述示例中，处理函数只会在 $event.key 等于 PageDown 时被调用。

### 按键码
使用 keyCode 特性也是允许的：
```html
<!-- 按回车键会触发执行submit函数 -->
<input v-on:keyup.13="submit">
```
<span style="color: red; font-weight: bold;">注意：</span>keyCode 的事件用法已经被[废弃](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/keyCode)了，并可能不会被最新的浏览器支持。

为了在必要的情况下支持旧浏览器，Vue 提供了绝大多数常用的按键码的别名：
- .enter（回车键）
- .tab 
- .delete (捕获“删除”和“退格”键)
- .esc
- .space （空格键）
- .up （箭头上键）
- .down （箭头下键）
- .left（箭头左键）
- .right（箭头右键）

除了使用Vue提供的按键别名之外，还可以自定义按键别名：
```js
// 全局配置
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```
```js
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // 小驼峰 不可用
  mediaPlayPause: 179,
  // 取而代之的是 短横线分隔 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
}
```
```html
<input type="text" @keyup.media-play-pause="method">
```

## 系统修饰键
可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。
修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时修饰键必须处于按下状态，换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 keyup.ctrl。而单单释放 ctrl 也不会触发事件。如果你想要这样的行为，请为 ctrl 换用 keyCode：keyup.17。
- .ctrl
- .alt
- .shift
- .meta
  在 Mac 系统键盘上，meta 对应 command 键 (⌘)。
  在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。
  在 Sun 操作系统键盘上，meta 对应实心宝石键 (◆)。
  在其他特定键盘上，尤其在 MIT 和 Lisp 机器的键盘、以及其后继产品，比如 Knight 键盘、space-cadet 键盘，meta 被标记为“META”。
  在 Symbolics 键盘上，meta 被标记为“META”或者“Meta”
```html
<!-- Alt + C -->
<input @keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Do something</div>
```

### exact 修饰符
- 允许你控制由精确的系统修饰符组合触发的事件。
- 2.5.0 +
```html
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button @click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```
## 鼠标按钮修饰符
- 仅当点击特定的鼠标按钮时会处理执行函数
- 2.2.0 +
- .left
- .right
- .middle

# 列表渲染
利用v-for指令，基于数据多次渲染元素。

## 在v-for中使用数组
用法：(item, index) in items
参数：items: 源数据数组
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;item：数组元素别名
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index：可选，索引
可以访问所有父作用域的属性

```html
<ul id="app">
  <li v-for="(person, index) in persons">
    {{ index }}---{{ person.name }}---{{ person.age }}
  </li>
</ul>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    persons: [
      { name: '杉杉', age: 18 },
      { name: '思彤哥', age: 20 },
      { name: '成哥', age: 22 },
      { name: '邓哥', age: 88 },
    ]
  }
})
```
可以利用```of```替代```in```作为分隔符，因为它更接近迭代器的语法：
```html
<div v-for="item of items"></div>
```
## 在v-for中使用对象
用法：(value, key, index) in Object
参数：value: 对象值
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;key：可选，键名
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;index：可选，索引
```html
<ul id="app">
  <li v-for="(value, key, index) in shan">
    {{ value }}
  </li>
</ul>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    shan: {
      name: '杉',
      age: 18,
      height: '163cm'
    }
  }
})
```

## 在v-for中使用数字
用法：n in num
参数：n: 数字，从1开始
```html
<div>
  <span v-for="n in num">{{ n }} </span>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    num: 10
  }
})
```

## 在v-for中使用字符串
用法：str in string
参数：str: 字符串，源数据字符串中的每一个
```html
<div>
  <span v-for="str in string">{{ str }} </span>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    string: 'shanshan'
  }
})
```

## 循环一段包含多个元素的内容
可以利用template元素循环渲染一段包含多个元素的内容
```html
<ul id="app">
  <template v-for="person in persons">
    <li>{{ item.msg }}</li>
    <li>哈哈</li>
  </template>
</ul>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    persons: ['shan', 'jc', 'cst', 'deng']
  }
})
```
## 关于key
Vue更新使用v-for渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是简单复用此处每个元素：
```html
<ul id="app">
  <li v-for="(person, index) in persons">
    {{ person }}
    <input type="text" />
    <button @click="handleClick(index)">下移</button>
  </li>
</ul>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    persons: ['shan', 'jc', 'cst', 'deng']
  },
  methods: {
    handleClick (index) {
      const deleteItem = this.persons.splice(index, 1);
      this.persons.splice(index + 1, 0, ...deleteItem);
    }
  }
})
```
在"就地复用"策略中，点击按钮，输入框不随文本一起下移，是因为输入框没有与数据绑定，所以vuejs默认使用已经渲染的dom，然而文本是与数据绑定的，所以文本被重新渲染。这种处理方式在vue中是默认的列表渲染策略，因为高效。

这个默认的模式是高效的，但是在更多的时候，我们并不需要这样去处理，所以，为了给Vue一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，我们需要为每项提供一个<span style="color: red;">唯一</span>key特性，Vue会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。

### key的使用方法
预期值：number | string
有相同父元素的子元素必须有独特的 key，重复的 key 会造成渲染错误，key应唯一。
```html
<ul id="app">
  <li v-for="(person, index) in persons" :key="person">
    {{ person }}
  </li>
</ul>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    persons: ['杉杉', '思彤哥', '成哥', '邓哥']
  }
}) 
```

> 不建议将数组的索引作为key值，如：
```html
<li v-for="(person, index) in persons" :key="index">
  {{ person }}
</li>
```
当改变数组时，页面会重新渲染，Vue会根据key值来判断要不要移动元素。例如当页面重新渲染时，key值为"杉杉"的元素为``<li>杉杉</li>``，页面重新渲染前，key值为"杉杉"的元素也为``<li>杉杉</li>``，那么Vue就会移动这个``li``元素，而不是重新生成一个元素。
当使用数组的索引作为key值时，页面重新渲染后，元素的key值会重新被赋值，例如我们将数组进行反转，
反转前：
元素 | key值 | 
- | :-: | 
``<li>杉杉</li>`` | 0 |
``<li>思彤哥</li>`` | 1| 
``<li>成哥</li>`` | 2 |
``<li>邓哥</li>`` | 3 |
反转后：
元素 | key值 | 
- | :-: | 
``<li>邓哥</li>`` | 0 |
``<li>成哥</li>`` | 1| 
``<li>思彤哥</li>`` | 2 |
``<li>杉杉</li>`` | 3 |
Vue会比对渲染前后拥有同样key的元素，发现有变动，就会再生成一个元素，如果用索引作key值得话，那么此时，所有的元素都会被重新生成。

> 那么key如何唯一的？

跟后台协作时，传回来的每一条数据都有一个id值，这个id就是唯一的，用id做key即可。

> key不仅为v-for所有，它可以强制替换元素，而不是重复使用它：

```html
<ul id="app">
  <button @click="show = !show">{{ show ? '显示' : '隐藏'}}</button>
  <input type="text" v-if="show" key="a" />
  <input type="text" v-else key="b" />
</ul>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    show: true
  }
}) 
```

## v-for 和 v-if 一同使用
永远不要把 v-if 和 v-for 同时用在同一个元素上。
当 Vue 处理指令时，v-for 比 v-if 具有更高的优先级，所以这个模板：
```html
<ul>
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
将会经过如下运算：
```js
this.users.map(function (user) {
  if (user.isActive) {
    return user.name
  }
})
```
因此哪怕我们只渲染出一小部分用户的元素，也得在每次重新渲染的时候遍历整个列表，不论活跃用户是否发生了变化。
所以以下两种场景，我们可以做出如下处理：
1. 为了过滤一个列表中的项目。
```html
<ul id="app">
  <li
    v-for="user in users"
    v-if="user.isActive"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    users: [
      { name: 'shan', isActive: true, id: 1},
      { name: 'jc', isActive: false, id: 2},
      { name: 'cst', isActive: false, id: 3},
      { name: 'deng', isActive: true, id: 4},
    ]
  }
})
```
可以把上面的代码更新为：
```html
<!-- 通过原来的数组，得到一个新数组，渲染这个新的数组 -->
<ul>
  <li
    v-for="user in activeUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    users: [
      { name: 'shan', isActive: true, id: 1},
      { name: 'jc', isActive: false, id: 2},
      { name: 'cst', isActive: false, id: 3},
      { name: 'deng', isActive: true, id: 4},
    ],
    activeUsers: []
  }
})
vm.activeUsers = vm.users.filter(user => user.isActive);
```
这种方式仅为演示，在日后学习完计算属性后，要利用计算属性来做。

2. 为了避免渲染本应该被隐藏的列表
```html
<ul>
  <li
    v-for="user in users"
    v-if="shouldShowUsers"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    users: [
      { name: 'shan', isActive: true, id: 1},
      { name: 'jc', isActive: false, id: 2},
      { name: 'cst', isActive: false, id: 3},
      { name: 'deng', isActive: true, id: 4},
    ],
    shouldShowUsers: false
  }
})
```
html部分可替换成为：
```html
<ul v-if="shouldShowUsers">
  <li
    v-for="user in users"
    :key="user.id"
  >
    {{ user.name }}
  </li>
</ul>
```
将 v-if 置于外层元素上，我们不会再对列表中的每个用户检查 shouldShowUsers。取而代之的是，我们只检查它一次，且不会在 shouldShowUsers 为否的时候运算 v-for。

# 练习_仿淘宝商品筛选
css文件在文件夹中，自行拷贝
所需数据：
```js
goodsList: [
  {
    title: '上装',
    typeList: ['全部', '针织衫', '毛呢外套', 'T恤', '羽绒服', '棉衣', '卫衣', '风衣' ],
    id: 1,
  },
  {
    title: '裤装',
    typeList: ['全部', '牛仔裤', '小脚/铅笔裤', '休闲裤' ,'打底裤', '哈伦裤'],
    id: 2,
  },
  {
    title: '裙装',
    typeList: ['全部', '连衣裙', '半身裙', '长袖连衣裙', '中长款连衣裙'],
    id: 3,
  }
]
```

# 练习_todoList
css文件在文件夹中，自行拷贝


# v-model指令
可以在表单元素上创建双向数据绑定。即数据更新元素更新、元素更新数据也会更新。
> 本质上v-model为语法糖

元素类型 | 属性 |  事件  
-|-|-
input[type=text]、textarea | value | input |
input[checkbox]、input[radio] | checked | change |
select | value | change |


## input

### type=text 文本框
```html
<div id="app">
  <input v-model="message">
  <p>Message 为: {{ message }}</p>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data:; {
    message: ''
  }
})
```

### type=checkbox 复选框
#### 单个复选框
绑定到布尔值，v-model="Boolean"
```html
<div id="app">
  <input 
    type="checkbox" 
    id="checkbox" 
    v-model="checked"
  />
  <label for="checkbox">{{ checked }}</label>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    checked: true
  }
})
```

#### 多个复选框
绑定到同一个数组，v-model="Array"
数组中的值为被选中的input框value值
```html
<div id="app">
  <input type="checkbox" id="cheng" value="成哥" v-model="checkedNames">
  <label for="cheng">成哥</label>

  <input type="checkbox" id="deng" value="邓哥" v-model="checkedNames">
  <label for="deng">邓哥</label>
  
  <input type="checkbox" id="tong" value="思彤哥" v-model="checkedNames">
  <label for="tong">思彤哥</label>
  <br>
  <span>被选中的人有: {{ checkedNames }}</span>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    checkedNames: []
  }
}) 
```

### type=radio 单选框
被绑定的数据和value同步
```html
<div id="app">
  <input type="radio" id="cheng" value="成哥" v-model="picked">
  <label for="cheng">成哥</label>
  <input type="radio" id="deng" value="邓哥" v-model="picked">
  <label for="deng">邓哥</label>
  <input type="radio" id="tong" value="思彤哥" v-model="picked">
  <label for="deng">思彤哥</label>
  <br>
  <span>被选中的人: {{ picked }}</span>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    picked: ''
  }
}) 
```

## textarea
```html
<div id="app">
  <p >多行文本为：{{ message }}</p>
  <textarea v-model="message" placeholder="添加文本"></textarea>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    message: ''
  }
})  
```

## select
匹配的值为option中的汉字
### 单选
```html
<div id="app">
  <select v-model="selected">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>选择: {{ selected === '请选择' ? '' : selected }}</span>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    selected: '请选择'
  }
}) 
```
<span style="color: red;">注意：</span>如果 v-model 表达式的初始值未能匹配任何选项，``<select>`` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，可以提供一个值为空的禁用选项：
```html
<div id="app">
  <select v-model="selected">
    <option :disabled="selected">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>选择: {{ selected === '请选择' ? '' : selected }}</span>
</div>
```

### 多选
绑定到一个数组
```html
<div id="app">
  <select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>选择: {{ selected }}</span>
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    selected: []
  }
}) 
```

## 修饰符
### .lazy
在默认情况下，v-model在每次input事件触发后将输入框的值与数据进行同步。如果要变为使用change事件同步可以添加lazy修饰符：
```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

### .number
自动将用户的输入值转为数值类型：
```html
<input v-model.number="age" type="number">
```

### .trim
自动过滤用户输入的<span style="font-weight: bold;">首尾</span>空白字符：
```html
<input v-model.trim="msg">
```

# 练习_简易计算器
# 练习_调查问卷
```js
questionList: [
  {
    type: 'short',
    title: '1.请问你的姓名是？',
    chooseList: null,
    answer: '',
    id: 0
  },
  {
    type: 'single',
    title: '2.请问您的性别是？',
    chooseList: [
      '男',
      '女',
      '保密',
    ],
    answer: '',
    id: 1,
  },
  {
    type: 'multiple',
    title: '3. 请选择您的兴趣爱好：',
    chooseList: [
      '看书',
      '游泳',
      '跑步',
      '看电影',
      '听音乐',
    ],
    answer: [],
    id: 2,
  },
  {
    type: 'long',
    title: '4. 请介绍一下自己:',
    chooseList: null,
    answer: '',
    id: 3,
  },
]
```


# 计算属性
有些时候，我们在模板中放入了过多的逻辑，从而导致模板过重，且难以维护。例如：
```html
<div id="app">
  {{ message.split('').reverse().join('') }}
</div>
```
碰到这样的情况，我们必须看一段时间才能意识到，这里是想要显示变量message的翻转字符串，而且，一旦我们想要在模板中多次使用翻转字符串时，会更加麻烦。
所以，当我们处理复杂逻辑时，都应该使用计算属性。

## 基础用法

计算属性是Vue配置对象中的属性，使用方式如下：
```html
<div id="app">
  <!-- 计算属性的值可以像data数据一样，直接被使用 -->
  {{ someComputed }}
</div>
```
```js
const vm = new Vue({
  el: '#app',
  computed: {
    // 返回的值，就是计算属性的值
    someComputed () {
      return 'some values'
    }
  }
})
```

例如，我们想要获取到一串字符串的翻转字符串，我们可以利用计算属性来做：
```html
<div id="app">
  <p>原始字符串: "{{ msg }}"</p>
  <p>翻转字符处啊: "{{ reversedMsg }}"</p>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello'
  },
  computed: {
    reversedMsg: function () {
      return this.msg.split('').reverse().join('');
    }
  }
})
```
我们可以看到，reversedMsg的值取决于msg的值，所以，当我们更改msg的值是，reversedMsg的值也会随之更改。

## 计算属性 vs 方法
其实，我们上述的功能，利用方法也可以实现，如：
```html
<div id="app">
  <p>原始字符串: "{{ msg }}"</p>
  <p>翻转字符串: "{{ reversedMsg() }}"</p>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello'
  },
  methods: {
    reversedMsg: function () {
      return this.msg.split('').reverse().join('');
    }
  }
})
```
虽然在表达式中调用方法也可以实现同样的效果，但是使用``计算属性``和使用``方法``有着本质的区别。
当使用方法时，每一次页面重新渲染，对应的方法都会重新执行一次，如：
```html
<div id="app">
  <p>{{ name }}</p>
  <p>{{ reversedMsg() }}</p>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello',
    name: 'shanshan'
  },
  methods: {
    reversedMsg: function () {
      console.log('方法执行啦');
      return this.msg.split('').reverse().join('');
    }
  }
})
vm.name = 'duyi';  
```
在上面的例子中我们可以看到，一旦更改name的值，页面会重新渲染，此刻控制台中打印出`方法执行啦`这串字符串，代表着reversedMsg这个函数执行了，但是我们并不需要该方法执行，因为改动的数据和这个函数没有任何关系，如果这个函数内的逻辑很复杂，那么对于性能来讲，也是一种消耗。

但是利用计算属性做，就不会有这样的现象出现，如：
```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello',
    name: 'shanshan'
  },
  computed: {
    reversedMsg: function () {
      console.log('计算执行啦');
      return this.msg.split('').reverse().join('');
    }
  }
})
vm.name = 'duyi';  
```
此时可以看到，当给数据name重新赋值时，计算属性并没有执行。
所以，计算属性和方法的最本质的区别，是：<span style="font-weight: bold;">计算属性是基于响应式依赖进行缓存的</span>，计算属性的值一直存于缓存中，只要它依赖的data数据不改变，每次访问计算属性，都会立刻返回缓存的结果，而不是再次执行函数。而方法则是每次触发重新渲染，调用方法将总会再次执行函数。

> 那么，为什么需要缓存呢？

假如说，我们有一个计算属性A，它需要遍历一个巨大的数组并且做巨大的计算。然后我们需要使用到这个计算属性A，如果没有缓存，我们就会再次执行A的函数，这样性能开销就变得很大了。

## 深入计算属性
计算属性除了写成一个函数之外，还可以写成一个对象，对象内有两个属性，getter&setter，这两个属性皆为函数，写法如下：
```js
const vm = new Vue({
  el: '#app',
  computed: {
    fullName: {
      getter () {
        // 一些代码
      },
      setter () {
        // 一些代码
      }
    }
  }
})
```

### getter 读取
在前面，我们直接将计算属性写成了一个函数，这个函数即为getter函数。也就是说，计算属性默认只有getter。
getter的this，被自动绑定为Vue实例。

> 何时执行？

当我们去获取某一个计算属性时，就会执行get函数。

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello'
  },
  computed: {
    reversedMsg: {
      getter () {
        return this.msg.split('').reverse().join('');
      }
    }
  }
})
```

### setter 设置
可选，set函数在给计算属性重新赋值时会执行。
参数：为被重新设置的值。
setter的this，被自动绑定为Vue实例。


```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello',
    firstStr: ''
  },
  computed: {
    reversedMsg: {
      getter () {
        return this.msg.split('').reverse().join('');
      },
      setter (newVal) {
        this.firstStr = newVal[0];
      }
    }
  }
})
```
要注意，即使给计算属性赋了值，计算属性也不会改变，在重复一遍，只有当依赖的响应式属性变化了，计算属性才会重新计算。

# 练习_姓名筛选
```js
personArr: [
  { 
    name: '王港', 
    src: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4005587090,2408158268&fm=26&gp=0.jpg', 
    des: '颈椎不好', 
    sex: 'm', 
    id: '056482' 
  },
  { 
    name: '刘莹', 
    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571915784984&di=a0056fd06188e87b922c60878e5ce6e2&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F79%2F64%2F5c05df1faf3b7_610.jpg', 
    des: '我是谁', 
    sex: 'f', 
    id: '157894' 
  },
  { 
    name: '刘秀莹', 
    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571915803971&di=47dc968f55b16a461de3e8f25bdf8600&imgtype=0&src=http%3A%2F%2Fimg.duoziwang.com%2F2016%2F11%2F27%2F190426198344.jpg', des: '我长得很好看', 
    sex: 'f', 
    id: '2849245' 
  },
  { 
    name: '刘金雷', 
    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571915748758&di=5be825da4d37bcc21959946c101d5609&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201707%2F19%2F20170719211350_4PnBt.jpeg', 
    des: '你没有见过陌生的脸', 
    sex: 'm', 
    id: '348515' 
  },
  { 
    name: '刘飞翔', 
    src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1571915762633&di=49517ca62ecddb638cdfb2158a64e39a&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201702%2F05%2F20170205222154_WLdJS.jpeg', 
    des: '瓜皮刘', 
    sex: 'm', 
    id: '478454'
  }
],
```

# 练习_全选商品
```js
courseList: [
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i1/TB1VtAgdlWD3KVjSZFs3KIqkpXa_040950.jpg_80x80.jpg',
    title: '渡一教育 CSS3 深度剖析',
    price: 1299,
    cart: 1,
    id: 0
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i7/TB1_VJecBWD3KVjSZKPagip7FXa_045814.jpg_80x80.jpg',
    title: '渡一教育 移动端开发课程',
    price: 1148,
    cart: 1,
    id: 1595402664708
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i2/TB1J.Q4cQxz61VjSZFto7uDSVXa_010347.jpg_80x80.jpg',
    title: '渡一教育 2019年 HTMLCSS零基础入学宝典',
    price: 1,
    cart: 1,
    id: 1596305473062
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i2/TB1bHwlaCWD3KVjSZSgVbgCxVXa_032434.jpg_80x80.jpg',
    title: '渡一教育 Web前端开发JavaScriptJs课',
    price: 1,
    cart: 1,
    id: 1595413512182
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i2/TB1MJd3g4z1gK0jSZSgnHevwpXa_014447.jpg_80x80.jpg',
    title: 'Web前端开发高级工程师全阶班【渡一教育】',
    price: 12798,
    cart: 1,
    id: 1596302161181
  },
  {
    poster: 'https://img.alicdn.com/bao/uploaded/i6/TB1xPeAbwaH3KVjSZFpjaLhKpXa_105848.jpg_80x80.jpg',
    title: '渡一教育 Java零基础入门到精通（集合，泛型等）',
    price: 1,
    cart: 1,
    id: 1596300025301,
  },
]
```

# 侦听器
侦听属性，响应数据（data&computed）的变化，当数据变化时，会立刻执行对应函数，

## 值类型

### 函数类型

例：

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello，你好呀，我是杉杉',
  },
  watch: {
    msg () {
      console.log('msg的值改变啦~');
    }
  }
})
// 更改msg的值
vm.msg = 'hello~~~~'; // 此时会在控制台中打印出` msg的值改变啦 `
```

侦听器函数，会接收两个参数，第一个参数为newVal(被改变的数据)，第二个参数为oldVal(赋值新值之前的值)。如在上述代码中，将侦听器watch更改一下，如：
```js
watch: {
  msg (newVal,oldVal) {
    conosle.log(newVal, oldVal);
  }
}

// 更改msg的值
vm.msg = 'hello~~~~'; // 此时会在控制台中打印出`hello，你好呀，我是杉杉  hello~~~~`
```

### 字符串类型
值为方法名字，被侦听的数据改变时，会执行该方法。
```js
const vm = new Vue({
  el: '#app'
  data: {
    msg: '杉杉'
  },
  watch: {
    msg: 'msgChange'
  },
  methods: {
    msgChange () {
      console.log('msg的值改变啦');
    }
  }
})
vm.msg = 'hello'; // 此时msgChange函数会执行，控制台中打印出 ` msg的值改变啦 `
```

### 对象类型
写成对象类型时，可以提供选项。

#### handler
必需。handler时被侦听的数据改变时执行的回调函数。
handler的值类型为函数/字符串，写成字符串时为一个方法的名字。
```js
const vm = new Vue({
  el: '#app'
  data: {
    msg: '杉杉'
  },
  watch: {
    msg: {
      handler () {
        console.log('msg的值改变啦');
      }
    }
  }
})
vm.msg = 'hello'; // 此时回调函数会执行，控制台中打印出 ` msg的值改变啦 `
```

#### deep
在默认情况下，侦听器侦听对象只侦听引用的变化，只有在给对象赋值时它才能被监听到。所以需要使用deep选项，让其可以发现对象内部值的变化，将deep的值设置为true，那么无论该对象被嵌套的有多深，都会被侦听到。

```js
const vm = new Vue({
  el: '#app'
  data: {
    personObj: {
      name: '邓旭明',
      age: 88
    }
  },
  watch: {
    personObj: {
      handler () {
        console.log('对象的值改变啦');
      }，
      deep: true   // 开启深度侦听
    }
  }
})
vm.obj.name = '老邓头'; // 此时回调函数会执行，控制台中打印出 ` 对象的值改变啦 `
```
注意，当对象的属性较多的时候，性能开销会比较大，此时可以监听对象的某个属性，这个后面再说。

#### immediate
加上immediate选项后，回调将会在侦听开始之后立刻被调用。而不是等待侦听的数据更改后才会调用。
```js
const vm = new Vue({
  el: '#app'
  data: {
    msg: '杉杉'
  },
  watch: {
    msg: {
      handler () {
        console.log('回调函数执行啦');
      },
      immediate: true
    }
  }
})
// 此时未更改msg的值，就会在控制台打印出来` 回调函数执行啦 `
``` 

### 数组类型
可以将多种不同值类型写在一个数组中。如：

```js
const vm = new Vue({
  el: '#app'
  data: {
    msg: '杉杉'
  },
  watch: {
    msg: [
      'msgChange',
      function () {},
      {
        handler () {},
        deep: true,
        immediate: true
      }
    ]
  }
})
```

## 键类型

### 正常对象key值
以上演示的都是正常的对象key值，这里不再赘述。

### 字符串类型key值
当key值类型为字符串时，可以实现监听对象当中的某一个属性，如：
```js
const vm = new Vue({
  el: '#app'
  data: {
    personObj: {
      name: '邓旭明',
      age: 88
    }
  },
  watch: {
    'personObj.name' () {
      console.log('对象的值改变啦');
    }
  }
})
vm.obj.name = '老邓头'; // 此时回调函数会执行，控制台中打印出 ` 对象的值改变啦 `
```

## vm.$watch
Vue实例将会在实例化时调用\$watch，遍历watch对象的每一个属性。
我们也可以利用vm.\$watch来实现侦听，用法与watch选项部分一致，略有不同。以下为使用方法。

1. 侦听某个数据的变化
```js
// 1. 三个参数，一参为被侦听的数据；二参为数据改变时执行的回调函数；三参可选，为设置的选项对象
vm.$watch(
  'msg', 
  function () {
    // 干了点事儿
  }, 
  {
    deep: Boolean, 
    immediate: Boolean
  }
)

// 2. 二个参数，一参为被侦听的数据；二参为选项对象，其中handler属性为必需，是数据改变时执行的回调函数，其他属性可选。
vm.$watch(
  'msg', 
  {
    handler () {
      // 干了点事儿
    },
    deep: Boolean, 
    immediate: Boolean
  }
)
```

2. 侦听某个对象属性的变化
```js
vm.$watch('obj.name', /**参数和上面一之*/)
```
3. 当监听的数据的在初始不确定，由多个数据得到时，此时可以将第一个参数写成函数类型
```js
vm.$watch(function () {
  // 表达式`this.a + this.b`每次得出一个不同的结果时该函数都会被调用
  // 这就像监听一个未被定义的计算属性
  return this.a + this.b;
}, /**参数和上面一致*/)
```

侦听器函数执行后，会返回一个取消侦听函数，用来停止触发回调：
```js
const unwatch = vm.$watch('msg', function () {});
unwatch(); // 执行后会取消侦听msg数据
```
使用unwatch时，需要注意的是，在带有immediate选项时，不能在第一次回调时取消侦听数据。
```js
const unwatch = vm.$watch('msg', function () {
    // 干了点儿事
    unwatch();  // 此时会报错
  },{
    immediate: true
  }
})
```
如果仍然希望在回调内部用一个取消侦听的函数，那么可以先检查该函数的可用性：
```js
var unwatch = vm.$watch('msg', function () {
    // 干了点儿事
    if(unwatch) {
      unwatch();  
    }
  },{
    immediate: true
  }
})
```

## 侦听器 vs 计算属性
1. 两者都可以观察和响应Vue实例上的数据的变动。
2. watch擅长处理的场景是：一个数据影响多个数据。计算属性擅长处理的场景是：多个数据影响一个数据。

3. 在侦听器中可以执行异步，但是在计算属性中不可以，例：

使用侦听器：
```js
var vm = new Vue({
  el: '#app',
  data: {
    question: '',
  },
  watch: {
    question () {
      setTimeout(() => {
        alert(this.question);
      }, 1000)
    }
  }
})
```

# 练习_仿百度搜索联想
url: https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su

请求方式：jsonp

发送参数：
1. wd：字符串，搜索的文字
2. cb：字符串，callback函数的名字

返回结果：（JSON格式）
```js
{
  q: String,
  p: Boolean,
  s: Array   // 搜索联想列表
}
```

# vue-resource
在Vue中实现异步加载需要使用到vue-resource库，利用该库发送ajax。

## 引入vue-resource
```js
<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
```
要注意的是，vue-resource依赖于Vue，所以要先引入Vue，再引入vue-resource。

引入vue-resource之后，在Vue的全局上会挂载一个\$http方法，在vm.\$http方法上有一系列方法，每个HTTP请求类型都有一个对应的方法。

vue-resource使用了promise，所以\$http中的方法的返回值是一个promise。

## 请求方法

### POST请求
用于提交数据
<br/>

<span style="font-weight: bold;">常用data格式：</span>
  - 表单提交：multipart/form-data，比较老的网站会使用表单提交去获取数据，现在基本都不用表单提交，而是使用ajax，但是现在表单提交仍然存在，有时候需要做图片上传、文件上传。
  - 文件上传：application/json，现在大多数情况下都是用这个格式
<br/>

<span style="font-weight: bold;">使用方法：</span>vm.\$http.post(url, [body], [options])
- url: 必需，请求目标url
- body: 非必需，作为请求体发送的数据
- options：非必需，作为请求体发送的数据

```js
this.$http.post('https://developer.duyiedu.com/vue/setUserInfo', {
    name: this.name,
    mail: this.mail
  })
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  })
```

### GET请求
获取数据

<span style="font-weight: bold;">使用方法：</span>vm.\$http.get(url, [options])

```js
this.$http.get('https://developer.duyiedu.com/vue/getUserInfo')
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  })
```

在get请求时传参：
```js
this.$http.get('https://developer.duyiedu.com/vue/getUserInfo'， {
  params: {
    id: 'xxx'
  }
})
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  })
```

### PUT请求
更新数据，将所有的数据全都推送到后端
<span style="font-weight: bold;">使用方法：</span>vm.\$http.put(url, [body], [config])

### PATCH请求
更新数据，只将修改的数据全都推送到后端
<span style="font-weight: bold;">使用方法：</span>vm.\$http.patch(url, [body], [config])

### DELETE请求
删除数据
<span style="font-weight: bold;">使用方法：</span>vm.\$http.delete(url, [config])

### HEAD请求
请求头部信息
<span style="font-weight: bold;">使用方法：</span>vm.\$http.head(url, [config])

### JSONP请求
除了jsonp以外，以上6种的API名称是标准的HTTP方法。
<br />
<span style="font-weight: bold;">使用方法：</span>vm.\$http.jsonp(url, [options]);

```js
this.$http.jsonp('https://developer.duyiedu.com/vue/jsonp').then(res => {
  this.msg = res.bodyText;
});


this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
  params: {
    wd: 'nn',
  },
  jsonp: 'cd', //jsonp默认是callback,百度缩写成了cb，所以需要指定下 
})
  .then(res => {
    console.log(res);
  })
```

## options 参数说明

参数 | 类型 | 描述  
:-: | :-: | :-:
url | String | 请求目标url |
body | Object, FormData, string | 作为请求体发送的数据 |
headers | Object | 作为请求头部发送的头部对象 |
params | Object | 作为URL参数的参数对象 |
method | String | HTTP方法 (例如GET，POST，...) |
responseType | String | 设置返回数据的类型 |
timeout | Number | 在请求发送之前修改请求的回调函数 |
credentials | Boolean | 是否需要出示用于跨站点请求的凭据 |
emulateHTTP | Boolean | 是否需要通过设置X-HTTP-Method-Override头部并且以传统POST方式发送PUT，PATCH和DELETE请求。 |
emulateJSON | Boolean |  设置请求体的类型为application/x-www-form-urlencoded |
before | function(request) | 在请求发送之前修改请求的回调函数 |
uploadProgress | function(event) | 用于处理上传进度的回调函数 |
downloadProgress | function(event) | 用于处理下载进度的回调函数 |

## 响应对象
通过如下属性和方法处理一个请求获取到的响应对象：

### 属性

属性 | 类型 | 描述  
:-: | :-: | :-:
url | String | 响应的 URL 源 |
body | Object, Blob, string | 响应体数据 |
headers | Header | 请求头部对象 |
ok | Boolean | 当 HTTP 响应码为 200 到 299 之间的数值时该值为 true |
status | Number | HTTP 响应码 |
statusText | String | HTTP 响应状态 |

### 方法

方法 |  描述  
:-: | :-:
text() |  以字符串方式返回响应体 |
json() | 以格式化后的 json 对象方式返回响应体 |
blob() |  以二进制 Blob 对象方式返回响应体 |

以json()为例：

```js
this.$http.get('https://developer.duyiedu.com/vue/getUserInfo')
  .then(res => {
    return res.json();
  })
  .then(res => {
    console.log(res);
  })
```

## 最后的话
很不幸，Vue官方已不再维护这个库了，so...哈哈哈，我们再学点其他的୧[ * ಡ ▽ ಡ * ]୨

# Axios
Axios是一个基于promise的HTTP库

浏览器支持情况：Chrome、Firefox、Safari、Opera、Edge、IE8+

## 引入
```js
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## API

- axios(config)
- axios(url, [config])

## config 配置对象
最常用的配置：
```js
axios({
  method: 'get', // post、get、put....
  baseURL: '', // 请求的域名，基本地址
  url: '', // 请求的路径
  params: {}, // 会将请求参数拼接在url上
  data: {}, // 会将请求参数放在请求体中
  headers: {}, // 设置请求头，例如设置token等
  timeout: 1000, // 设置请求超时时长，单位：ms
})
```

## 方法别名
为方便起见，为所有支持的请求方法提供了别名。

- axios.request(config)
- axios.get(url, [config])
- axios.post(url, [data], [config]])
- axios.delete(url, [config])
- axios.head(url, [config])
- axios.put(url, [data], [config])
- axios.patch(url, [data], [config]])
- axios.options(url, [config])

## 配置默认值
可以指定将被用在各个请求的配置默认值

### 全局配置
```js
axios.defaults.baseURL = 'https://developer.duyiedu.com/vue';
axios.defaults.timeout = 1000;
```

在实际项目中，很少用全局配置。

### 实例配置

> 可以使用自定义配置新建一个axios实例

```js
const instance = axios.create({
  baseURL: 'https://developer.duyiedu.com/vue',
  timeout: 1000,
})

instance.get('/getUserInfo').then(res => {
  // ...
})
```

### 请求配置
```js
const instance = axios.create();
instance.get('/getUserInfo', {
  timeout: 5000
})
```

### 配置的优先顺序

全局 < 实例 < 请求

## 并发
同时进行多个请求，并统一处理返回值

- axios.all(iterable)
- axios.spread(callback)

```js
axios.all([
  axios.get('/a'),
  axios.get('/b')
]).then(axios.spread((aRes, bRes) => {
  console.log(aRes, bRes);
}))
```

## 拦截器
interceptors，在发起请求之前做一些处理，或者在响应回来之后做一些处理。

### 请求拦截器 
```js
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config;
})
```

### 响应拦截器
```js
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
})
```

### 移除拦截器
```js
const myInterceptor = axios.interceptors.request.use(config => {});
axios.interceptors.request.eject(myInterceptor);
```

### 为axios实例添加拦截器
```js
const instance = axios.create();
instance.interceptors.request.use(config => {});
```

## 取消请求
用于取消正在进行的http请求
```js
const source = axios.CancelToken;
const source = CancelToken.source();

axios.get('/getUserInfo', {
  cancelToken: source.token
}).then(res => {
  console.log(res);
}).catch(error => {
  if(axios.isCancel(error)) {
    // 取消请求
    console.log(error.message);
  } else {
    // 处理错误
  }
})

// 取消请求 参数 可选
source.cancel('取消请求');
```

## 错误处理
在请求错误时进行的处理
request / response 是error的上下文，标志着请求发送 / 得到响应
在错误中，如果响应有值，则说明是响应时出现了错误。
         如果响应没值，则说明是请求时出现了错误。
在错误中，如果请求无值，则说明是请求未发送出去，如取消请求。

```js
axios.get('/user/12345')
  .catch(function (error) {
    // 错误可能是请求错误，也可能是响应错误
    if (error.response) {
      // 响应错误
    } else if (error.request) {
      // 请求错误
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

在实际开发过程中，一般在拦截器中统一添加错误处理
请求拦截器中的错误，会当请求未成功发出时执行，但是要注意的是：取消请求后，请求拦截器的错误函数也不会执行，因为取消请求不会抛出异常，axios对其进行了单独的处理。
在更多的情况下，我们会在响应拦截器中处理错误。
```js
const instance = axios.create({});
instance.interceptors.request(config => {

}, error => {
  return Promise.reject(error);
})

instance.interceptors.response(response => {

}, error => {
  return Promise.reject(error);
})
```

## axios 预检
当axios的请求为非简单请求时，浏览器会进行预检，及发送OPTIONS请求。请求到服务器，询问是否允许跨域。如果响应中允许预检中请求的跨域行为，则浏览器会进行真正的请求。否则会报405错误。

# template 选项

> 关于el

提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTML 元素 实例。

如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。

> template

一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素，挂载元素的内容都将被忽略。
```html
<div id="app"></div>
```
```js
const vm = new Vue({
  el: '#app',
  template: `
    <div id="ceshi">xxx</div>
  `,
})
```

> Vue初始化到挂载的流程

![](https://developer.duyiedu.com/myVue/template.png) 

# Vue生命周期
每个 Vue 实例在被创建时都要经过一系列的初始化过程，例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

## 生命周期图示
![](https://developer.duyiedu.com/myVue/lifecycle1.png) 

## 生命周期钩子
所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算

![](https://developer.duyiedu.com/myVue/lifecycle2.png) 

### beforeCreate
在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

```html
<div id="app">
  <div @click="handleClick">点击事件</div>
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hellow world',
  },
  beforeCreate () {
    console.log(this.msg);   // undefined
    console.log(this.handleClick);  // undefined
    console.log('-----beforeCreate-----'); 
  },
  methods: {
    handleClick () {
      console.log(handleClick);
    }
  },
  watch: {
    msg: {
      handler () {
        console.log('侦听msg的值'); 
      },
      immediate: true,
    }
  }
})
```

打印顺序：
```js
undefined
undefined
-----beforeCreate-----
侦听msg的值
```

### created
在实例创建完成后被立即调用。

在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。

如果要在第一时间调用methods中的方法，或者操作data中的数据，可在此钩子中进行操作。
需要注意的是，执行此钩子时，挂载阶段还未开始，$el 属性目前不可见。

此时，可以进行数据请求，将请求回来的值赋值给data中的数据。

```html
<div id="app">
  <div @click="handleClick">点击事件</div>
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hellow world',
  },
  created () {
    console.log(this.msg);  // hello world
    console.log(this.handleClick);  // function () {...}
    console.log(this.$el);  // undefined
    console.log('----------created-------');
  },
  methods: {
    handleClick () {
      console.log(handleClick);
    }
  },
  watch: {
    msg: {
      handler () {
        console.log('侦听msg的值'); 
      },
      immediate: true,
    }
  }
})
```

打印顺序：
```js
侦听msg的值
hellow world
ƒ handleClick () { console.log(handleClick); }
undefined
----------created-------
```

### beforeMount
在挂载开始之前被调用，此时模板已经编译完成，只是未将生成的模板替换el对应的元素。

在此钩子函数中，可以获取到模板最初始的状态。

此时，可以拿到vm.$el，只不过为旧模板

```js
const vm = new Vue({
  el: '#app',
  beforeMount () {
    console.log(this.$el);
  }
})
```

### mounted
el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。

在该钩子函数中的vm.$el为新模板。

执行完该钩子函数后，代表实例已经被完全创建好。

如果要在第一时间，操作页面上的dom节点时，可以在此钩子函数中操作

```js
const vm = new Vue({
  el: '#app',
  mounted () {
    console.log(this.$el);
  }
})
```

### beforeUpdate
数据更新时调用，发生在虚拟 DOM 打补丁之前。此时数据已经更新，但是DOM还未更新

```html
<div id="app">
  {{ msg }}
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hellow world',
  },
  beforeUpdate () {
    console.log(this.msg);
    console.log(this.$el);
  },
  methods: {
    handleClick () {
      console.log('handleClick');
    }
  }
})
this.msg = 'xxx';
```
### updated
数据更改导致DOM重新渲染后，会执行该钩子函数。

此时数据和dom同步。

### beforeDestroy
实例销毁之前调用。在这一步，实例仍然完全可用。

可以在该钩子函数中，清除定时器。
```html
<div id="app">
  {{ msg }}
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hellow world',
    timer: 0,
  },
  created () {
    this.timer = setInterval(() => {
      console.log('xxx');
    }, 500)
  },
  beforeDestroy () {
    clearInterval(this.timer);
  }
})
```

### destroyed
Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除。

# 练习_bilibili首页

1.轮播图

baseURL: 'https://developer.duyiedu.com/vue/bz'
url: '/banner'

2.导航

baseURL: 'https://developer.duyiedu.com/vue/bz'
url: '/nav'

3.视频

baseURL: 'https://developer.duyiedu.com/vue/bz'
url: '/video'
Request:

  name | type | describe 
  :-: | :-: | :-: 
  start | Number | 数据起始值
  offset | Number | 偏移量

# 组件基础

## 组件是什么？
组件是可复用的Vue实例，且带有一个名字，例如名字为shanshan-cmp，那么我们则可以在一个通过new Vue创建的根实例中，把这个组件作为自定义元素来使用：
```html
<div id="app">
  <shanshan-cmp></shanshan-cmp>
</div>
```
```js
const vm = new Vue({
  el: '#app'
})
```
因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。

## 组件注册

### 全局组件
> Vue.component

利用Vue.component创建的组件组件是全局注册的。也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中。

参数：
  - {string}
  - {Function | Object} [definition]

用法：
  注册或获取全局组件。注册还会自动使用给定的id设置组件的名称。

示例：
```html
<div id="app">
  <button-counter></button-counter>
</div>
```

```js
Vue.component('button-counter', {
  data () {
    return {
      count: 0,
    }
  },
  template: `
    <button @click="count ++">你按了我{{ count }}次</button>
  `
})

const vm = new Vue({
  el: '#app',
})
```

### 局部组件
在components选项中定义要使用的组件。
对于 components 对象中的每一个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。

示例：
```html
<div id="#app">
  <button-counter></button-counter>
</div>
```
```js
const buttonCounter = {
  data () {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count ++">你按了我{{ count }}次</button>
  `,
}

const vm = new Vue({
  el: '#app',
  components: {
    'button-counter': buttonCounter
  }
})
```

### 组件名
在注册一个组件的时候，我们始终需要给它一个名字。你给予组件的名字可能依赖于你打算拿它来做什么，所以命名要语义化。

> 组件名大小写

定义组件名的方式有两种：

> 使用kebab-case (横短线分隔命名)

```js
Vue.component('my-component', {/***/});
```

当使用kebab-case定义一个组件时，你必须在引用这个自定义元素时使用kebab-case，例如：``<my-component></my-component>``。

> 使用PascalCase (大驼峰命名)

```js
Vue.component('MyComponent', {/***/});
```
当使用PascalCase定义一个组件时，你在引用这个自定义元素时两种命名法都可以。也就是说``<my-component-name>`` 和 ``<MyComponentName>`` 都是可接受的。注意，尽管如此，直接在 DOM (即字符串模板或单文件组件) 中使用时只有 kebab-case 是有效的。

另：我们强烈推荐遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。

### 组件复用
可以将组件进行任意次数的复用：
```html
<div id="#app">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```
### 自闭合组件
在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做。

自闭合组件表示它们不仅没有内容，而且刻意没有内容。其不同之处就好像书上的一页白纸对比贴有“本页有意留白”标签的白纸。而且没有了额外的闭合标签，你的代码也更简洁。

不幸的是，HTML 并不支持自闭合的自定义元素——只有官方的“空”元素。所以上述策略仅适用于进入 DOM 之前 Vue 的模板编译器能够触达的地方，然后再产出符合 DOM 规范的 HTML。

### 组件的data选项
当我们定义一个组件时，它的 data 并不是像这样直接提供一个对象：
```js
data: {
  count: 0
}
```
取而代之的是，一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：
```js
data () {
  return {
    count: 0
  }
}
```
如果 Vue 没有这条规则，点击一个按钮就可能会像下面一样影响到其它所有实例:

![avatar](https://developer.duyiedu.com/myVue/data.gif)

### 单个根元素
每个组件必须只有一个根元素，当模板的元素大于1时，可以将模板的内容包裹在一个父元素内。

# 组件_Prop

## 注册自定义特性
组件默认只是写好结构、样式和行为，使用的数据应由外界传递给组件。
> 如何传递？注册需要接收的prop，将数据作为一个自定义特性传递给组件。

如：
```html
<div id="app">
  <video-item 
    title="羊村摇" 
    poster="https://developer.duyiedu.com/bz/video/955bac93ccb7f240d25a79b2ff6a9fdbda9537bc.jpg@320w_200h.webp" 
    play="638000" 
    rank="1207"
  ></video-item>
</div>
```
```js
Vue.component('video-item', {
  props: ['title', 'poster', 'play', 'rank'],
})
```
在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 data 中的值一样：
```html
<div id="app">
  <video-item 
    title="羊村摇" 
    poster="https://developer.duyiedu.com/bz/video/955bac93ccb7f240d25a79b2ff6a9fdbda9537bc.jpg@320w_200h.webp" 
    play="638000" 
    rank="1207"
  ></video-item>
</div>
```
```js
Vue.component('video-item', {
  props: ['title', 'poster', 'play', 'rank'],
  template: `<div>{{ title }}</div>`
})
```

## Prop的大小写

HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。故：当 传递的prop为 短横线分隔命名时，组件内 的props 应为 驼峰命名 。
如：
```html
<div id="app">
  <!-- 在 HTML 中是 kebab-case 的 -->
  <video-item sub-title="hello!"></video-item>
</div>
```
```js
Vue.component('video-item', {
  // 在 JavaScript 中是 camelCase 的
  props: ['subTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```
要注意的是：如果使用的是字符串模板，那么这个限制就不存在了。

## 传递静态或动态 Prop
像这样，我们已经知道了可以给 prop 传入一个静态的值：
```html
<video-item title="羊村摇"></video-item>
```

若想要传递一个动态的值，可以配合v-bind指令进行传递，如：
```html
<video-item :title="title"></video-item>
```

### 传递一个对象的所有属性
如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind 。例如，对于一个给定的对象 person：
```js
person: {
  name: 'shanshan',
  age: 18
}
```

传递全部属性：
```html
<my-component v-bind="person"></my-component>
```

上述代码等价于：
```html
<my-component
  :name="person.name"
  :age="person.age"
></my-component>
```

# 组件_Prop验证
我们可以为组件的 prop 指定验证要求，例如你可以要求一个 prop 的类型为什么。如果说需求没有被满足的话，那么Vue会在浏览器控制台中进行警告，这在开发一个会被别人用到的组件时非常的有帮助。

为了定制 prop 的验证方式，你可以为 props 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

```js
Vue.component('my-component', {
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise
  }
})
```

上述代码中，对prop进行了基础的类型检查，类型值可以为下列原生构造函数中的一种：``String``、``Number``、``Boolean``、``Array``、``Object``、``Date``、``Function``、``Symbol``、任何自定义构造函数、或上述内容组成的数组。
需要注意的是`null` 和 `undefined` 会通过任何类型验证。
除基础类型检查外，我们还可以配置高级选项，对prop进行其他验证，如：类型检测、自定义验证和设置默认值。
如：
```js
Vue.component('my-component', {
  props: {
    title: {
      type: String, // 检查 prop 是否为给定的类型
      default: '杉杉最美',   // 为该 prop 指定一个默认值，对象或数组的默认值必须从一个工厂函数返回，如：default () { return {a: 1, b: 10} },
      required: true, // 定义该 prop 是否是必填项
      validator (prop) {  // 自定义验证函数，该prop的值回作为唯一的参数代入，若函数返回一个falsy的值，那么就代表验证失败
        return prop.length < 140;
      }
    }
  }
})
```

为了更好的团队合作，在提交的代码中，prop 的定义应该尽量详细，至少需要指定其类型。

# 组件_单向数据流

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。

这里有两种常见的试图改变一个 prop 的情形：

1. 这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用，在后续操作中，会将这个值进行改变。在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

2. 这个 prop 以一种原始的值传入且需要进行转换。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

# 组件_非Prop特性
非Prop特性指的是，一个未被组件注册的特性。当组件接收了一个非Prop特性时，该特性会被添加到这个组件的根元素上。


## 替换/合并已有的特性

想象一下 ``<my-cmp>`` 的模板是这样的：

```html
<input type="date" class="b">
```

为了给我们的日期选择器插件定制一个主题，我们可能需要像这样添加一个特别的类名：

```html
<my-cmp
  class="my-cmp"
></my-cmp>
```

在这种情况下，我们定义了两个不同的 class 的值：

- my-cmp，这是在组件的模板内设置好的
- b，这是从组件的父级传入的

对于绝大多数特性来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style 特性会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：my-cmp b。

## 禁用特性继承
如果不希望组件的根元素继承特性，那么可以在组件选项中设置 ``inheritAttrs: false``。如：
```js
Vue.component('my-cmp', {
  inheritAttrs: false,
  // ...
})
```
在这种情况下，非常适合去配合实例的 $attrs 属性使用，这个属性是一个对象，键名为传递的特性名，键值为传递特性值。

```js
{
  required: true,
  placeholder: 'Enter your username'
}
```

使用 ``inheritAttrs: false`` 和 ``$attrs`` 相互配合，我们就可以手动决定这些特性会被赋予哪个元素。如：

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `,
})
```

注意：inheritAttrs: false 选项不会影响 style 和 class 的绑定。

# 组件_监听组件事件
首先，我们来写一个博文组件，如：
```js
Vue.component('blog-post', {
  props: {
    post: {
      type: Object,
    }
  },
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button>放大字号</button>
      <div>{{ post.content }}</div>
    </div>
  `,
})
```
```html
<div id="app">
  <div :style="{fontSize: postFontSize + 'em'}">
    <blog-post
      v-for="post in posts"
      :key="post.id"
      :post="post"
    >
    </blog-post>
  </div>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    posts: [
      { title: '标题1', content: '正文内容', id: 0, },
      { title: '标题2', content: '正文内容', id: 1, },
      { title: '标题3', content: '正文内容', id: 2, },
    ],
    postFontSize: 1
  }
})
```

可以看到每一个博文组件中，都有一个按钮，可以去放大页面中字体的字号，也就是说，当点击这个按钮时，我们要告诉父组件改变``postFontSize``数据去放大所有博文的文本。碰见这样的情况，该如何做呢？

Vue 实例提供了一个自定义事件来解决这个问题。父组件可以像处理原生DOM元素一样，通过 ``v-on``指令，监听子组件实例的任意事件，如：
```html
<div id="app">
  <div :style="{fontSize: postFontSize + 'em'}">
    <blog-post
      ...
      @enlarge-text="postFontSize += 0.1"
    >
    </blog-post>
  </div>
</div>
```
那么，怎么样能够去监听到一个 ``enlarge-text``这么奇怪的事件呢？这就需要在组件内，去主动触发一个**自定义事件**了。

如何触发？ 
通过调用 $emit 方法 并传入事件名称来触发一个事件，如：

```js
Vue.component('blog-post', {
  props: {
    ...
  },
  template: `
    <div class="blog-post">
      ...
      <button @click="$emit('enlarge-text')">放大字号</button>
      ...
    </div>
  `,
})
```

这样，父组件就可以接收该事件，更新数据 ``pageFontSize`` 的值了。

## 使用事件抛出一个值
在有些情况下，我们可能想让 ``<blog-post>``组件决定它的文本要放大多少。这是可以使用 $emit 的第二个参数来提供这个值，如：

```js
Vue.component('blog-post', {
  props: {
    ...
  },
  template: `
    <div class="blog-post">
      ...
      <button @click="$emit('enlarge-text', 0.2)">放大字号</button>
      ...
    </div>
  `,
})
```

在父组件监听这个事件时，可以通过 $event 访问到被抛出的这个值：

```html
<div id="app">
  <div :style="{fontSize: postFontSize + 'em'}">
    <blog-post
      ...
      @enlarge-text="postFontSize += $event"
    >
    </blog-post>
  </div>
</div>
```

或者，将这个事件处理函数写成一个方法：

```html
<div id="app">
  <div :style="{fontSize: postFontSize + 'em'}">
    <blog-post
      ...
      @enlarge-text="onEnlargeText"
    >
    </blog-post>
  </div>
</div>
```

那么，这个值将会作为第一个参数，传入这个方法：
```js
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

## 事件名
不同于组件和prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所有的名称。如果触发一个camelCase名字的事件：
```js
this.$emit('myEvent')
```
则监听这个名字的kabab-case版本是不会有任何效果的。
```html
<!-- 没有效果 -->
<my-component v-on:my-event="doSomething"></my-component>
```
与组件和prop不同的是，事件名不会被当作一个 JS 变量名或者属性名，所以就没有理由使用camelCase 或 PascalCase 了。

并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写，所以 @myEvent 将会变成 @myevent，导致 myEvent 不可能被监听到。

因此，推荐**始终使用 kebab-case 的事件名**。

## 将原生事件绑定到组件
在组件上去监听事件时，我们监听的是组件的自动触发的自定义事件，但是在一些情況下，我们可能想要在一个组件的根元素上直接监听一个原生事件。这是，可以使用 v-on 指令的 .native 修饰符，如：
```html
<base-input @focus.native="onFocus" @blur.native="onBlur"></base-input>
```
```js
Vue.component('base-input', {
  template: `
    <input type="text" />
  `
})
```
这样处理，在有些时候是很有用的，不过在尝试监听一个类似``<input>``元素时，这并不是一个好主意，例如``<base-input>``组件可能做了重构，如：
```html
<label>
  姓名：
  <input type="text">
</label>
```
可以看到，此时组件的根元素实际上是一个<label>元素，那么父级的.native监听器将静默失败。它不会产生任何报错，但是``onFocus``处理函数不会如预期被调用。

为了解决这个问题，Vue提供了一个$listeners属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。例如：
```js
{
  focus: function (event) { /* ... */ }
  blur: function (event) { /* ... */ },
}
```

有了这个 \$listeners 属性，我们可以配合 v-on="\$listeners" 将所有的事件监听器指向这个组件的某个特定的子元素，如：
```js
Vue.component('base-input', {
  template: `
    <label>
      名字：
      <input v-on="$listeners" />
    </label>
  `
})
```

## 在组件上使用 v-model
由于自定义事件的出现，在组件上也可以使用v-model指令。

在 input 元素上使用v-mode指令时，相当于绑定了value特性以及监听了input事件：

```html
<input v-model="searchText" />
```
等价于：
```html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
>
```

当把v-model指令用在组件上时：
```html
<base-input v-model="searchText" /> 
```
则等价于：
```html
<base-input
  :value="searchText"
  @input="searchText = $event"
/>
```
同 input 元素一样，在组件上使用v-model指令，也是绑定了value特性，监听了input事件。

所以，为了让 v-model 指令正常工作，这个组件内的``<input>``必须：
- 将其value特性绑定到一个叫 value 的prop 上
- 在其input事件被触发时，将新的值通过自定义的input事件抛出
如：
```js
Vue.component('base-input', {
  props: ['value'],
  template: `
    <input 
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  `
}) 
```
这样操作后，v-model就可以在这个组件上工作起来了。

通过上面的学习，我们知道了，一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。碰到这样的情况，我们可以利用 model 选项来避免冲突：
```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    >
  `
})
```
使用组件：
```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```
这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的属性将会被更新。

## .sync 修饰符
除了使用 v-model 指令实现组件与外部数据的双向绑定外，我们还可以用 v-bind 指令的修饰符 .sync 来实现。

那么，该如何实现呢？
先回忆一下，不利用 v-model 指令来实现组件的双向数据绑定：

```html
<base-input :value="searchText" @input="searchText = $event"></base-input>
```
```js
Vue.component('base-input', {
  props: ['value'],
  template: `
    <input 
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  `
}) 
```
那么，我们也可以试着，将监听的事件名进行更改，如：
```html
<base-input :value="searchText" @update:value="searchText = $event"></base-input>
```
```js
Vue.component('base-input', {
  props: ['value'],
  template: `
    <input 
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
  `
}) 
```

这样也是可以实现双向数据绑定的，那么和 .sync 修饰符 有什么关系呢？
此时，我们对代码进行修改：
```html
<base-input :value.sync="searchText"></base-input>
```
```js
Vue.component('base-input', {
  props: ['value'],
  template: `
    <input 
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
  `
}) 
```

所以，.sync 修饰符 本质上也是一个语法糖，在组件上使用：
```html
<base-input :value.sync="searchText"></base-input>
```

等价于：
```html
<base-input
  :value="searchText"
  @update:value="searchText = $event"
/>
```

当我们用一个对象同时设置多个prop时，也可以将.sync修饰符和 v-bind配合使用：
```html
<base-input v-bind.sync="obj"></base-input>
```

**注意：**
- 带有.sync修饰符的v-bind指令，只能提供想要绑定的属性名，**不能**和表达式一起使用，如：``:title.sync="1+1"``，这样操作是无效的
- 将 ``v-bind.sync`` 用在 一个字面量对象上，如 ``v-bind.sync="{ title: 'haha' }"``，是无法工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

## v-model VS .sync
先明确一件事情，在 vue 1.x 时，就已经支持 .sync 语法，但是此时的 .sync 可以完全在子组件中修改父组件的状态，造成整个状态的变换很难追溯，所以官方在2.0时移除了这个特性。然后在 vue2.3时，.sync又回归了，跟以往不同的是，现在的.sync完完全全就是一个语法糖的作用，跟v-model的实现原理是一样的，也不容易破环院有的数据模型，所以使用上更安全也更方便。


- 两者都是用于实现双向数据传递的，实现方式都是语法糖，最终通过 ``prop`` + ``事件`` 来达成目的。
- vue 1.x 的 .sync 和 v-model 是完全两个东西，vue 2.3 之后可以理解为一类特性，使用场景略微有区别
- 当一个组件对外只暴露一个受控的状态，切都符合统一标准的时候，我们会使用v-model来处理。.sync则更为灵活，凡是需要双向数据传递时，都可以去使用。


# 组件_插槽
和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：
```html
<my-cmp>
  Something bad happened.
</my-cmp>
```
如果有这样的需求，我们就可以通过插槽来做。

## 插槽内容
通过插槽，我们可以这样合成组件：

```html
<my-cmp>
  写在组件标签结构中的内容
</my-cmp>
```

组件模板中可以写成：

```html
<div>
  <slot></slot>
</div>
```

当组件渲染时，``<slot></slot>``将会被替换为“写在组件标签结构中的内容”。
插槽内可以包含任何模板代码，包括HTML和其他组件。
如果``<my-cmp>``没有包含``<slot>``元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

## 编译作用域
当在插槽中使用数据时：
```html
<my-cmp>
  这是插槽中使用的数据：{{ user }}
</my-cmp>
```
该插槽跟模板的其他地方一样可以访问相同的实例属性，也就是相同的“作用域”，而不能访问``<my-cmp>``的作用域。
请记住：
**父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**

## 后备内容
我们可以设置默认插槽，它会在没有提供内容时被渲染，如，在``<my-cmp>``组件中：
```js
Vue.compopnent('my-cmp', {
  template: `
    <button type="submit">
      <slot></slot>
    </button>
  `
})
```
我们希望这个``<button>``内绝大多数情况下都渲染文本“Submit”，此时就可以将“Submit”作为后备内容，如：
```js
Vue.compopnent('my-cmp', {
  template: `
    <button type="submit">
      <slot>Submit</slot>
    </button>
  `
})
```
当使用组件未提供插槽时，后备内容将会被渲染。如果提供插槽，则后备内容将会被取代。

## 具名插槽
有时我们需要多个插槽，如``<my-cmp>``组件：
```js
Vue.compopnent('my-cmp', {
  template: `
    <div class="container">
      <header>
        <!-- 页头 -->
      </header>
      <main>
        <!-- 主要内容 -->
      </main>
      <footer>
        <!-- 页脚 -->
      </footer>
    </div>
  `
})
```
此时，可以在``<slot>``元素上使用一个特殊的特性：name。利用这个特性定义额外的插槽：
```js
Vue.compopnent('my-cmp', {
  template: `
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  `
})
```
一个不带 name 的 ``<slot>`` 出口会带有隐含的名字“default”。
在向具名插槽提供内容的时候，我们可以在一个 ``<template>`` 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：
```html
<my-cmp>
  <template v-slot:header>
    <h1>头部</h1>
  </template>

  <p>内容</p>
  <p>内容</p>

  <template v-slot:footer>
    <p>底部</p>
  </template>
</my-cmp>
```
现在``<template>``元素中的所有内容都会被传入相应的插槽。任何没有被包裹在带有``v-slot``的``<template>``中的内容都会被视为默认插槽的内容。
为了模板更清晰，也可以写成以下这样：
```html
<my-cmp>
  <template v-slot:header>
    <h1>头部</h1>
  </template>

  <template v-slot:default>
    <p>内容</p>
    <p>内容</p>
  </template>

  <template v-slot:footer>
    <p>底部</p>
  </template>
</my-cmp>
```

**注意：v-slot只能添加在``<template>``上，只有一种例外情况。**

## 作用域插槽
为了能够让插槽内容访问子组件的数据，我们可以将子组件的数据作为``<slot>``元素的一个特性绑定上去：
```js
Vue.component('my-cmp', {
  data () {
    return {
      user: {
        name: '杉杉',
        age: 18,
      }
    }
  },
  template: `
    <span>
      <slot v-bind:user="user"></slot>
    </span>
  `,
})
```
绑定在 ``<slot>`` 元素上的特性被称为**插槽 prop**。
那么在父级作用域中，我们可以给``v-slot``带一个值来定义我们提供的插槽prop的名字：
```html
<div id="app">
  <my-cmp>
    <template v-slot:default="slotProps">
      {{ slotProps.user.name }}
    </template>
  </my-cmp>
</div>
```

### 独占默认插槽的缩写语法
当被提供的内容只有默认插槽时，组件的标签可以被当作插槽的模板来使用，此时，可以将``v-slot``直接用在组件上：
```html
<my-cmp v-slot:default="slotProps">
  {{ slotProps.user.name }}
</my-cmp>
```
也可以更简单：
```html
<my-cmp v-slot="slotProps">
  {{ slotProps.user.name }}
</my-cmp>
```
注意：**默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确**。
```html
<!-- 无效，会导致警告 -->
<my-cmp v-slot="slotProps">
  {{ slotProps.user.name }}
  <template v-slot:other="otherSlotProps">
    slotProps 在这里是不合法的
  </template>
</my-cmp>
```
只要出现多个插槽，就需要为所有的插槽使用完整的基于``<template>``的语法。

### 解构插槽Prop
我们可以使用解构传入具体的插槽prop，如：
```html
<my-cmp v-slot="{ user }">
  {{ user.name }}
</my-cmp>
```
这样模板会更简洁，尤其是在为插槽提供了多个prop时。
此外还可以有其他可能，如prop重命名：
```html
<my-cmp v-slot="{ user: person }">
  {{ person.name }}
</my-cmp>
```
以及自定义后备内容，当插槽prop是undefined时生效：
```html
<my-cmp v-slot="{ user = { name: 'Guest' } }">
  {{ user.name }}
</my-cmp>
```

## 动态插槽名
> Vue 2.6.0新增
```html
<my-cmp>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</my-cmp>
```

## 具名插槽的缩写
> Vue 2.6.0新增

跟``v-on``和``v-bind``一样，``v-slot``也有缩写，将``v-slot:``替换为``#``。

```html
<my-cmp>
  <template #header>
    <h1>头部</h1>
  </template>

  <template #default>
    <p>内容</p>
    <p>内容</p>
  </template>

  <template #footer>
    <p>底部</p>
  </template>
</my-cmp>
```
当然，和其它指令一样，该缩写只在其有参数的时候才可用。

## 废弃了的语法

### 带有slot特性的具名插槽
> 自 2.6.0 起被废弃
```html
<my-cmp>
  <template slot="header">
    <h1>头部</h1>
  </template>

  <template>
    <p>内容</p>
    <p>内容</p>
  </template>

  <template slot="footer">
    <p>底部</p>
  </template>
</my-cmp>
```

### 带有slot-scope特性的作用域插槽
> 自 2.6.0 起被废弃
```html
<my-cmp>
  <template slot="default" slot-scope="slotProps">
    {{ slotProps.user.name }}
  </template>
</my-cmp>
```

# 组件_动态组件

## 基本使用
当我们在一个多标签的界面中，在不同组件之间进行动态切换是非常有用的。
```html
<div id="app">
  <button 
    v-for="page in pages"
    @click="pageCmp = page.cmp"
    :key="page.id"
  >{{ page.name }}</button>
  <component :is="pageCmp"></component>
</div>
```
```js
Vue.component('base-post', {
  data () {
    return {
      postCmp: '',
      posts: [
        { title: "标题1", content: { template: `<div>内容1</div>`}, id: 11}, 
        { title: "标题2", content: { template: `<div>内容2</div>`}, id: 12}, 
        { title: "标题3", content: { template: `<div>内容3</div>`}, id: 13}, 
      ],
    }
  },
  mounted () {
    this.postCmp = this.posts[0].content;
  },
  template: `
    <div>
      <button
        v-for="post in posts"
        @click="postCmp = post.content"
        :key="post.id"
      >{{ post.title }}</button>
      <component :is="postCmp"></component>
    </div>
  `
})
Vue.component('base-more', {
  template: `<div>更多内容</div>`
})

const vm = new Vue({
  el: '#app',
  data: {
    pages: [
      { name: '博客', cmp: 'base-post', id: 0},
      { name: '更多', cmp: 'base-more', id: 1}
    ],
    pageCmp: 'base-post'
  },
})
```
通过上面方法，我们可以实现组件间的切换，能够注意到的是：每一次切换标签时，都会创建一个新的组件实例，重新创建动态组件在更多情况下是非常有用的，但是在这个案例中，我们会更希望哪些标签的组件实例能够在它们第一次被创建的时候缓存下来。为了解决这个问题，我们可以用一个``<keep-alive>``元素将动态组件包裹起来。如：
```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="pageCmp"></component>
</keep-alive>
```
注意：``<keep-alive>`` 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。

## keep-alive
``<keep-alive>`` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。``<keep-alive>`` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
当组件在 ``<keep-alive>`` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

## activated & deactivated
activated：keep-alive 组件激活时调用。
deactivated: keep-alive 组件停用时调用。

# 组件_处理边界情况
接下来我们要学习的都是和处理边界情况有关的功能，即一些需要对 Vue 的规则做一些小调整的特殊情况。需要注意的是，这些功能都是有劣势或危险场景的。

## 访问元素 & 组件
在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作 DOM 元素。不过也确实在一些情况下做这些事情是合适的。

### 访问根实例
在每个子组件中，可以通过 $root 访问根实例。
```js
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar () { /* ... */ }
  },
  methods: {
    baz () { /* ... */ }
  }
})
```

所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。
```js
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```
在demo或在有少量组件的小型应用中使用是非常方便的。但是在大型应用里使用就会很复杂了。所以，我们还是要用Vuex（后面会学）来管理应用的状态。

### 访问父级组件实例

在子组件中，可以通过 $parent 访问 父组件实例。这可以替代将数据以prop的方式传入子组件的方式。

如：
```html
<cmp-parent>
  <cmp-a></cmp-a>
</cmp-parent>
```
若 cmp-parent 需要共享一个属性 share，它的所有子元素都需要访问 share 属性，在这种情况下 cmp-a 可以通过 this.$parent.share的方式访问share。

但是，通过这种模式构建出来的组件内部仍然容易出现问题。比如，我们在cmp-a 中嵌套一个一个子组件 cmp-b，如：
```html
<cmp-parent>
  <cmp-a>
    <cmp-b></cmp-b>
  </cmp-a>
</cmp-parent>
```
那么，在cmp-b组件中去访问share时，需要先查看一下，其父组件中是否存在share，如果不存在，则在向上一级查找，落实到代码上为：
```js
var share = this.$parent.share || this.$parent.$parent.share;
```

这样做，很快组件就会失控：触达父级组件会使应用更难调试和理解，尤其是当变更父组件数据时，过一段时间后，很难找出变更是从哪里发起的。

碰到上述情况，可以使用依赖注入解决。

### 依赖注入
在上面的例子中，利用 $parent 属性，没有办法很好的扩展到更深层级的嵌套组件上。这也是依赖注入的用武之地，它用到了两个新的实例选项：provide 和 inject。

provide 选项允许我们指定想要提供给后代组件的数据/方法，例如:

```js
Vue.component('cmp-parent', {
  provide () {
    return {
      share: this.share,
    }
  },
  data () {
    return {
      share: 'share',
    }
  },
  template: `<div>cmp-parent</div>`
})
```

然后再任何后代组件中，我们都可以使用 inject 选项来接受指定想要添加在实例上的属性。

```js
Vue.component('cmp-a', {
  inject: ['share'],
  template: `<div>cmp-a</div>`
})
```

相比 $parent 来说，这个用法可以让我们在任意后代组件中访问share，而不需要暴露整个 cmp-parent 实例。这允许我们更好的持续研发该组件，而不需要担心我们可能会改变/移除一些子组件依赖的东西。同时这些组件之间的接口是始终明确定义的，就和 props 一样。

实际上，你可以把依赖注入看作一部分“大范围有效的 prop”，除了：
- 祖先组件不需要知道哪些后代组件使用它提供的属性
- 后代组件不需要知道被注入的属性来自哪里

然而，依赖注入还是有负面影响的。它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难。同时所提供的属性是非响应式的。这是出于设计的考虑，因为使用它们来创建一个中心化规模化的数据跟使用 $root做这件事都是不够好的。如果你想要共享的这个属性是你的应用特有的，而不是通用化的，或者如果你想在祖先组件中更新所提供的数据，那么这意味着你可能需要换用一个像 Vuex 这样真正的状态管理方案了。

### 访问子组件实例或子元素
尽管存在prop和事件，但是有时候我们仍可能需要在JS里直接访问一个子组件，那么此时，我们可以通过 ref 特性为子组件赋予一个ID引用：

```html
<my-cmp ref="cmp"></my-cmp>
```

这样就可以通过this.$refs.cmp 来访问``<my-cmp>``实例。
ref 也可以 对指定DOM元素进行访问，如:
```html
<input ref="input" />
```
那么，我们可以通过 this.$refs.input 来访问到该DOM元素。

当ref 和 v-for 一起使用时，得到的引用将会是一个包含了对应数据源的这些子组件的数组。

注意：\$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。应该避免在模板或计算属性中访问 \$refs。

## 程序化的事件侦听器
除了 v-on 和 $emit 外， Vue 实例在其事件接口中还提供了其它的方法。我们可以：

- 通过 $on(eventName, eventHandler) 侦听一个事件
- 通过 $once(eventName, eventHandler) 一次性侦听一个事件
- 通过 $off(eventName, eventHandler) 停止侦听一个事件

这几个方法一般不会被用到，但是，当需要在一个组件实例上手动侦听事件时，他们是可以派的上用场的。

例如，有时我们会在组件中集成第三方库：
```js
Vue.component('my-cmp', {
  // 一次性将这个日期选择器附加到一个输入框上
  // 它会被挂载到 DOM 上。
  mounted () {
    // Pikaday 是一个第三方日期选择器的库
    this.picker = new Pikaday({
      field: this.$refs.input,
      format: 'YYYY-MM-DD',
    })
  },
  // 在组件被销毁之前，
  // 也销毁这个日期选择器。
  beforeDestroy () {
    this.picked.destroy();
  },
  template: `
    <div>
      <input type="text" ref="input" />
      <button @click="$destroy()">销毁组件</button>
    </div>
  `,
})
```

使用上面的方法，有两个潜在的问题：
- 它需要在这个组件实例中保存这个 picker，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
- 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化地清理我们建立的所有东西。

所有，我们可以通过程序化的侦听器解决这两个问题：
```js
Vue.component('my-cmp', {
  mounted () {
    var picker = new Pikaday({
      field: this.$refs.input,
      format: 'YYYY-MM-DD',
    })
    this.$once('hook:beforeDestroy', () => {
      picker.destroy();
    })
  },
  template: `
    <div>
      <input type="text" ref="input" />
      <button @click="$destroy()">销毁组件</button>
    </div>
  `
})
```
使用了这个策略，我们还可以让多个输入框元素使用不同的pikaday：
```js
Vue.component('my-cmp', {
  mounted () {
    this.datePicker('inputA');
    this.datePicker('inputB');
  },
  methods: {
    datePicker (refName) {
      var picker = new Pikaday({
        field: this.$refs[refName],
        format: 'YYYY-MM-DD',
      })
      this.$once('hook:beforeDestroy', () => {
        picker.destroy();
      })
    },
  },
  template: `
    <div>
      <input type="text" ref="inputA" />
      <input type="text" ref="inputB" />
      <button @click="$destroy()">销毁组件</button>
    </div>
  `
})
```
注意，即便如此，如果你发现自己不得不在单个组件里做很多建立和清理的工作，最好的方式通常还是创建更多的模块化组件，在这个例子中，我们推荐创建一个可复用的 ``<input-datepicker>`` 组件。

## 循环引用

### 递归组件
组件是可以在它们自己的模板中调用自身的，不过它们只能通过name选项来做这件事：
```js
name: 'my-cmp'
```
不过当使用 Vue.component 全局注册一个组件时，全局的ID会自动设置为该组件的 name 选项。
```js
Vue.component('my-cmp', { /** */});
```
稍有不慎，递归组件就可能导致无限循环：
```js
name: 'my-cmp',
template: `<div><my-cmp /></div>`
```
类似上述的组件将会导致“max stack size exceeded”错误，所以要确保递归调用是条件性的 (例如使用一个最终会得到 false 的 v-if)。

### 组件之间的循环引用
有时，在去构建一些组件时，会出现组件互为对方的后代/祖先:
```js
Vue.component('cmp-a', {
  template: `
    <div>
      <cmp-b></cmp-b>
    </div>
  `
})
```
```js
Vue.component('cmp-b', {
  template: `
    <div>
      <cmp-a></cmp-a>
    </div>
  `
})
```
此时，我们使用的是全局注册组件，并不会出现悖论，但是如果使用的为局部组件就会出现悖论。

但是即使用了全局注册组件，在使用webpack去导入组件时，也会出现一个错误：Failed to mount component: template or render function not defined。

模块系统发现它需要 A，但是首先 A 依赖 B，但是 B 又依赖 A，但是 A 又依赖 B，如此往复。这变成了一个循环，不知道如何不经过其中一个组件而完全解析出另一个组件。为了解决这个问题，我们需要给模块系统一个点：“A 反正是需要 B 的，但是我们不需要先解析 B。”

```js
beforeCreate () {
  this.$options.components.CmpB = require('./tree-folder-contents.vue').default;
}
```
或者，在本地注册组件的时候，你可以使用 webpack 的异步 import：
```js
components: {
  CmpB: () => import('./tree-folder-contents.vue')
}
```

## 模板定义的替代品

### 内联模板
在使用组件时，写上特殊的特性：inline-template，就可以直接将里面的内容作为模板而不是被分发的内容（插槽）。

```html
<my-cmp inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-cmp>
```

不过，inline-template 会让模板的作用域变得更加难以理解。所以作为最佳实践，请在组件内优先选择 template 选项或 .vue 文件里的一个 ``<template>`` 元素来定义模板。

### X-Template
另一个定义模板的方式是在一个 ``<script>`` 元素中，并为其带上 text/x-template 的类型，然后通过一个 id 将模板引用过去。例如：
```html
<script 
  type="text/x-template" 
  id="hello-world-template"
>
  <p>Hello hello hello</p>
</script>
```
```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

这些可以用于模板特别大的 demo 或极小型的应用，但是其它情况下请避免使用，因为这会将模板和该组件的其它定义分离开。

## 控制更新

### 强制更新
当 更改了某个数据，页面未重新渲染时，可以调用 \$forceUpdate 来做一次强制更新。

但是在做强制更新前，需要留意数组或对象的变更检测注意事项，99.9%的情况，都是在某个地方做错了事，如果做了上述检查，仍未发现问题，那么可以通过 \$forceUpdate来更新。

### 通过v-once创建低开销的静态组件
渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了大量静态内容。在这种情况下，你可以在根元素上添加 v-once 特性以确保这些内容只计算一次然后缓存起来，就像这样：
```js
Vue.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```
试着不要过度使用这个模式。当你需要渲染大量静态内容时，极少数的情况下它会给你带来便利，除非你非常留意渲染变慢了，不然它完全是没有必要的——再加上它在后期会带来很多困惑。例如，设想另一个开发者并不熟悉 v-once 或漏看了它在模板中，他们可能会花很多个小时去找出模板为什么无法正确更新。

# 组件_通信

## prop 
父组件传递数据给子组件时，可以通过特性传递。

推荐使用这种方式进行父->子通信。

## $emit
子组件传递数据给父组件时，触发事件，从而抛出数据。

推荐使用这种方式进行子->父通信。

### v-model

### .sync

## $attrs
祖先组件传递数据给子孙组件时，可以利用$attrs传递。

demo或小型项目可以使用$attrs进行数据传递，中大型项目不推荐，数据流会变的难于理解。

$attrs的真正目的是撰写基础组件，将非Prop特性赋予某些DOM元素。

## $listeners
可以在子孙组件中执行祖先组件的函数，从而实现数据传递。

demo或小型项目可以使用$listeners进行数据传递，中大型项目不推荐，数据流会变的难于理解。

$listeners的真正目的是将所有的事件监听器指向这个组件的某个特定的子元素。

## $root
可以在子组件中访问**根**实例的数据。

对于 demo 或非常小型的有少量组件的应用来说这是很方便的。中大型项目不适用。会使应用难于调试和理解。

## $parent
可以在子组件中访问**父**实例的数据。

对于 demo 或非常小型的有少量组件的应用来说这是很方便的。中大型项目不适用。会使应用难于调试和理解。

## $children
可以在父组件中访问**子**实例的数据。

对于 demo 或非常小型的有少量组件的应用来说这是很方便的。中大型项目不适用。会使应用难于调试和理解。

## ref
可以在父组件中访问**子**实例的数据。

$refs 只会在组件渲染完成之后生效，并且它们不是响应式的，适用于demo或小型项目。

## provide & inject
祖先组件提供数据（provide），子孙组件按需注入（inject）。

会将组件的阻止方式，耦合在一起，从而使组件重构困难，难以维护。不推荐在中大型项目中使用，适用于一些小组件的编写。

## eventBus(事件总线)
```js
Vue.prototype.$bus = new Vue();
```
```js
Vue.component('cmp-a', {
  data () {
    return {
      a: 'a'
    }
  },
  methods: {
    onClick () {
      this.$bus.$on('click', this.a)
    }
  },
  template: `
    <div>
      <button @click="onClick">点击</button>
    </div>
  `,
})
```
```js
Vue.component('cmp-a', {
  mounted () {
    this.$bus.$on('click', data => {
      console.log(data);
    })
  },
  template: `
    <div>b</div>
  `,
})
```
非父子组件通信时，可以使用这种方法，但仅针对于小型项目。中大型项目使用时，会造成代码混乱不易维护。

## Vuex
状态管理，中大型项目时强烈推荐使用此种方式，日后再学~

# 混入
## 基础
混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

```js
var minxin = {
  created () {
    this.hello();
  },
  methods: {
    hello () {
      console.log('hello，我是混入中的函数');
    },
  }
}

Vue.component('my-cmp', {
  mixins: [mixin],
  template: `
    <div>xx</div>
  `
})
```

## 选项合并
当组件和混入对象含有同名选项时，这些选项会以恰当的方式进行“合并”。

合并数据，以组件数据优先：

```js
var mixin = {
  data () {
    return {
      msg: 'hello',
    }
  }
}
new Vue({
  mixins: [mixin],
  data: {
    msg: 'goodbye',
  },
  created: function () {
    console.log(this.msg)
})
```

合并钩子函数，将合并为一个数组。先调用混入对象的钩子，再调用组件自身钩子。

```js
var mixin = {
  created () {
    console.log('混入对象钩子')
  }
}

new Vue({
  el: '#app',
  mixins: [mixin],
  created () {
    console.log('组件钩子')
  }
})
```

合并值为对象的选项，如 methods、components 等，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

## 全局混入
混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。
```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
```

谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项。

# 自定义指令

## 简介

我们可以自己写一个自定义指令去操作DOM元素，以达到代码复用的目的。注意，在 Vue 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

全局注册指令：
```js
Vue.directive('focus', {/** */})
```

局部注册指令
```js
const vm = new Vue({
  el: '#app',
  directives: {
    focus: {/** */}
  }
})
```

使用：
```js 
<input v-focus></input>
```

例如，写一个自动聚焦的输入框：
```js
Vue.directive('focus', {
  // 当被绑定的元素插入到DOM时执行
  inserted: function (el) {
    el.focus();
  }
})
```
此时，在input元素上使用 v-focus 指令就可以实现自动聚焦了。

## 钩子函数
自定义指令对象提供了钩子函数供我们使用，这些钩子函数都为可选。

### bind
只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

### inserted
被绑定元素插入父节点时调用(仅保证父节点存在，但不一定已被插入文档中)。

### update
所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。

### componentUpdated
指令所在组件的 VNode **及其子 VNode** 全部更新后调用。

### unbind
只调用一次，指令与元素解绑时调用(被绑定的Dom元素被Vue移除)。

## 钩子函数参数
- el: 指令所绑定的元素，可以用来直接操作DOM。
- binding：对象，包含以下属性：
  - name：指令名，不包括 v- 前缀。
  - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
- vnode：Vue 编译生成的虚拟节点。
- oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

## 练习

### 模拟 v-show
```js
// 绑定的值为false，display为none，值为true，display为""
Vue.directive('myshow', {
  bind (el, binding, vnode, oldVnode) {
    var display = binding.value ? '' : 'none';
    el.style.display = display;
  },
  update (el, binding, vnode, oldVnode) {
    var display = binding.value ? '' : 'none';
    el.style.display = display;
  }
})
```
### 模拟 v-model
```js
// 1. 通过绑定的数据，给元素设置value
// 2. 当触发input事件时，去更改数据的值
// 3. 更改数据后，同步input的value值
Vue.directive('mymodel', {
  bind (el, binding, vnode) {
    const vm = vnode.context;
    const { value, expression } = binding;
    el.value = value;

    el.oninput = function (e) {
      const inputVal = el.value;
      vm[expression] = inputVal;
    }
  },
  update (el, binding) {
    const { value } = binding;
    el.value = value;
  },
})
```

### 写一个 v-slice（截取文本框）
```js
Vue.directive('slice', {
  bind (el, binding, vnode) {
    const vm = vnode.context;
    let { value, expression, arg, modifiers } = binding;

    if(modifiers.number) {
      value = value.replace(/[^0-9]/g, '');
    }


    el.value = value.slice(0, arg);
    vm[expression] = value.slice(0, arg);

    el.oninput = function (e) {
      let inputVal = el.value;

      if(modifiers.number) {
        inputVal = inputVal.replace(/[^0-9]/g, '');
      }

      el.value = inputVal.slice(0, arg);
      vm[expression] = inputVal.slice(0, arg);
    }
  },
  update (el, binding, vnode) {
    const vm = vnode.context;
    let { value, arg, expression, modifiers } = binding;

    if(modifiers.number) {
      value = value.replace(/[^0-9]/g, '');
    }

    el.value = value.slice(0, arg);
    vm[expression] = value.slice(0, arg);
  },
})
```

### 动态指令参数
指令的参数可以是动态的。如：``v-directive:[arguments]="value``，``argument``参数可以根据组件实例数据进行更新。

> 重写 v-slice

```js
Vue.directive('slice', {
  bind (el, binding, vnode) {
    const vm = vnode.context;
    let { value, expression, arg, modifiers } = binding;

    if(modifiers.number) {
      value = value.replace(/[^0-9]/g, '');
    }


    el.value = value.slice(0, arg);
    vm[expression] = value.slice(0, arg);

    el.oninput = function (e) {
      let inputVal = el.value;

      if(modifiers.number) {
        inputVal = inputVal.replace(/[^0-9]/g, '');
      }

      el.value = inputVal.slice(0, arg);
      vm[expression] = inputVal.slice(0, arg);
    }
  },
  update (el, binding, vnode) {
    const vm = vnode.context;
    let { value, arg, expression, modifiers } = binding;
    
    if(modifiers.number) {
      value = value.replace(/[^0-9]/g, '');
    }

    el.value = value.slice(0, arg);
    vm[expression] = value.slice(0, arg);

    el.oninput = function (e) {
      let inputVal = el.value;

      if(modifiers.number) {
        inputVal = inputVal.replace(/[^0-9]/g, '');
      }

      el.value = inputVal.slice(0, arg);
      vm[expression] = inputVal.slice(0, arg);
    }
  },
})
```

## 函数简写
当想在 bind 和 update 中触发相同行为，而不关心其他钩子时，可以写成函数的形式：
```js
Vue.directive('myshow', (el, binding) => {
  const { value } = binding;
  const display = value ? '' : 'none';
  el.style.display = display;
})
```
```js
Vue.directive('slice', (el, binding, vnode) => {
  const vm = vnode.context;
  let { value, expression, arg, modifiers } = binding;

  if(modifiers.number) {
    value = value.replace(/[^0-9]/g, '');
  }


  el.value = value.slice(0, arg);
  vm[expression] = value.slice(0, arg);

  el.oninput = function (e) {
    let inputVal = el.value;

    if(modifiers.number) {
      inputVal = inputVal.replace(/[^0-9]/g, '');
    }

    el.value = inputVal.slice(0, arg);
    vm[expression] = inputVal.slice(0, arg);
  }
})
```

## 对象字面量
如果自定义指令需要多个值，可以传入一个 JS 对象字面量。指令函数能够接受所有合法的 JS 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
```js
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```

# 过滤器
自定义过滤器，用于一些常见的文本格式化。

过滤器可用在两个地方：双花括号插值 和 v-bind 表达式，添加在JS表达式的尾部，由“管道”符号表示:
```html
<!-- 在双花括号中 -->
{{ message | filter }}

<!-- 在 v-bind 中 -->
<div v-bind:id="id | filter"></div>
```

## 定义过滤器
全局过滤器：
```js
Vue.filter('filter', value => {})
```

局部过滤器：
```js
filter () {
  return xxx;
}
```

## 参数
当过滤器形式为 `` msg | filter `` 时，filter过滤器接收一个参数，参数为``msg``。

当过滤器形式为 `` msg | filter('a') ``时，filter过滤器接收两个参数，参数为``msg, 'a'``

## 过滤器串联
```js
{{ msg | filterA | filterB }}
``` 
在这个例子中，filterA的参数为``msg``，filterB的参数为filterA。

## 练习
### 首字母大写
```html
{{ content | capitalize }}
```
```js
Vue.filter('capitalize', value => {
  if(!value) { return };
  return value.charAt(0).toUpperCase() + value.slice(1);
})
```

### 数字中间加上逗号
```html
{{ money | toMoney }}
```
```js
Vue.filter('toMoney', value => {
  if(!value) { return };
  return value.toLocaleString();
});
```

### 数字添加文字“万”
```html
{{ likes | addWord }}
```
```js
Vue.filter('addWord', value => {
  if(!value) { return };

  if(value > 10000) {
    return ( value / 10000).toFixed(1) + '万';
  }
  return value;
});
```

# 安装脚手架

## 安装@vue/cli
node 版本要求： >8.9，推荐使用8.11.0 +。

关于旧版本：
如果在这之前已经全局安装了旧版本的vue-cli(1.x 或 2.x)，那么需要先卸载掉。
运行：``npm uninstall vue-cli -g`` 或 ``yarn global remove vue-cli``。

安装：
```js
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

安装之后，可以在命令行中访问vue命令。

检查版本是否正确：

```js
vue --version
```

## 快速原型开发
安装：
```js
npm install -g @vue/cli-service-global
# OR
yarn global add @vue/cli-service-global
```

## 安装vscode插件
名字：Vetur。用于高亮.vue文件代码

# 练习_树形组件

数据：

```js
data: [
  {
    label: "一级 1",
    children: [
      {
        label: "二级 1-1",
        children: [
          {
            label: "三级 1-1-1"
          }
        ]
      }
    ]
  },
  {
    label: "一级 2",
    children: [
      {
        label: "二级 2-1",
        children: [
          {
            label: "三级 2-1-1"
          }
        ]
      },
      {
        label: "二级 2-2",
        children: [
          {
            label: "三级 2-2-1"
          }
        ]
      }
    ]
  },
  {
    label: "一级 3",
    children: [
      {
        label: "二级 3-1",
        children: [
          {
            label: "三级 3-1-1"
          }
        ]
      },
      {
        label: "二级 3-2",
        children: [
          {
            label: "三级 3-2-1"
          }
        ]
      }
    ]
  }
]
```

# 利用脚手架搭建项目

拉取 2.x 模板 (旧版本)

```js
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```

# 渲染函数

## 基础
当我们需要使用JavaScript的编程能力时，可以利用渲染函数。渲染函数比模板更接近于编译器。

例如，我们想要生成一些标题：
```html
<h1>Hello world!</h1>
```
如果，我们按照之前的方式，那么模板内将会十分冗余。如果此时利用渲染函数，那么代码写起来将会简洁很多。
```js
props: {
  level: {
    type: Number,
    required: true
  }
},
render: function (createElement) {
  return createElement(
    'h' + this.level,   // 标签名称
    this.$slots.default // 子节点数组
  )
},
```

## 节点、树、以及虚拟DOM
在深入渲染函数之前，先来了解一些浏览器的工作原理。例如，下面这段HTML：
```html
<div>
  <h1>My title</h1>
  Some text content
  <!-- TODO: Add tagline -->
</div>
```
当浏览器读到这些代码时，它会建立一个**DOM节点树** 来保持追踪所有内容，如同你会画一张家谱树来追踪家庭成员的发展一样。
以上HTML对应的DOM节点树如下图所示：
![avatar](https://cn.vuejs.org/images/dom-tree.png)

每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。就像家谱树一样，每个节点都可以有孩子节点。

高效地更新所有这些节点是比较困难的，不过幸运的是，我们不需要手动完成这个工作。只需要告诉Vue希望页面上的HTML是什么，例如在模板中：
```html
<h1>{{ blogTitle }}</h1>
```
或者是在一个渲染函数中：
```js
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
```
在这两种情况下，Vue 都会自动保持页面的更新，即便 blogTitle 发生了改变。

### 虚拟DOM
Vue通过建立一个**虚拟DOM**来追踪自己要如何改变真实DOM。例如：
```js
return createElement('h1', this.blogTitle);
```
createElement 会返回什么呢？
它不会返回一个实际的DOM元素。更准确的名字可能是：``createNodeDescription``，因为它所包含的信息会告诉Vue页面上需要渲染什么样的节点，包括其子节点的描述信息。我们把这样的节点描述为“虚拟节点（virtual node）”，也常简写它为“VNode”。“虚拟DOM”是我们对由Vue组件树建立起来的整个VNode树的称呼。

## createElement参数
createElement接收的参数：
```js
createElement(标签名(必需), 与模板中属性对应的数据对象(可选), 子级虚拟节点(可选));
```

### 深入数据对象
```js
{
  // 与 `v-bind:class` 的 API 相同，接受一个字符串、对象或字符串和对象组成的数组
  class: {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px',
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo',
  },
  // 组件 prop
  props: {
    myProp: 'bar',
  },
  // DOM属性
  domProps: {
    innerHTML: 'baz',
  },
  // 事件监听器，不支持如“v-on:keyup.enter”这样的修饰器
  on: {
    click: this.onClick
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用 vm.$emit 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，无法对 `binding` 中的 `oldValue`赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 其它特殊顶层属性
  key: 'myKey',
  ref: 'myRef',
  // 如果在渲染函数中给多个元素都应用了相同的 ref 名，那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
  // 作用域插槽，格式为：{ name: props => VNode | Array<VNode> }
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
}
```

## 使用JavaScript代替模板功能

### v-if 和 v-for
只要在原生的 JavaScript 中可以轻松完成的操作，Vue 的渲染函数就不会提供专有的替代方法。比如，在模板中使用的 v-if 和 v-for：
```html
<ul v-if="items.length">
  <li v-for="item in items">{{ item }}</li>
</ul>
<p v-else>No items found.</p>
```
这些都可以在渲染函数中用 JavaScript 的 if/else 和 map 来重写：
```js
props: ['items'],
render (createElement) {
  if(items.length) {
    return createElement('ul', this.items.map(item => createElement('li', item)))
  } else {
    return createElement('p', 'No items found');
  }
}
```

### v-model
渲染函数中没有与v-model的直接对应---必须自己实现相应的逻辑：
```html
<input v-model="value" />
```

```js
data () {
  return {
    value: 'ceshi',
  }
},
render (createElement) {
  const self = this;
  return createElement('input', {
    attrs: {
      value: self.value
    },
    on: {
      input (e) {
        self.value = e.target.value;
      }
    },
  });
},
```

### 事件&按键修饰符
对于 .passive、.capture 和 .once 这些事件修饰符, Vue 提供了相应的前缀可以用于 on：
修饰符 | 前缀  
:-: | :-:  
.passive | & 
.capture | ! 
.once | ~ 
.capture.once 或 .once.capture | ~! 

例如：

```js
on: {
  '!click': this.doThisInCapturingMode,
  '~keyup': this.doThisOnce,
  '~!mouseover': this.doThisOnceInCapturingMode
}
```

对于所有其它的修饰符，私有前缀都不是必须的，因为你可以在事件处理函数中使用事件方法：

修饰符 | 处理函数中的等价操作  
:-: | :-:  
.stop | event.stopPropagation()
.prevent | event.preventDefault() 
.self | if (event.target !== event.currentTarget) return 
按键：.enter, .13 | if (event.keyCode !== 13) return <br> 对于别的按键修饰符来说，可将 13 改为另一个按键码
修饰键：.ctrl, .alt, .shift, .meta | if (!event.ctrlKey) return (将 ctrlKey 分别修改为 altKey、shiftKey 或者 metaKey)

### 插槽
可以通过 this.$slots 访问静态插槽的内容，每个插槽都是一个 VNode 数组：
```html
<div>
  <slot></slot>
</div>
```
```js
render: function (createElement) {
  return createElement('div', this.$slots.default)
}
```

也可以通过 this.$scopedSlots 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数：
```html
<div>
  <slot :text="message"></slot>
</div>
```
```js
data() {
  return {
    msg: 'hello world',
  }
},
render: function (createElement) {
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.msg
    })
  ])
}
```
如果要用渲染函数向子组件中传递作用域插槽，可以利用 VNode 数据对象中的 scopedSlots 字段：
```html
<div>
  <base-slot v-slot="slotProps">
    {{ slotProps.text }}
  </base-slot>
</div>
```
```js
render: function (createElement) {
  return createElement('div', [
    createElement('base-slot', {
      // 在数据对象中传递 `scopedSlots`
      // 格式为 { name: props => VNode | Array<VNode> }
      scopedSlots: {
        default: function (props) {
          return createElement('span', props.text)
        }
      }
    })
  ])
}
```

# JSX 
在Vue中使用JSX语法。可以让我们回到更接近模板的语法上。
```js
render () {
  return (
    <h1>这是一个标题</h1>
  )
}
```

## 插值
```js
<div>{ this.value }</div>
```

## 指令
在JSX中，一些指令并不存在，所以我们可以换一种方式来处理。

### v-text
```html
<div domPropsTextContent="<p>i am a p</p>"></div>
```

### v-html
```html
<div domPropsInnerHTML="<p>i am a p</p>"></div>
```

### v-show
jsx支持v-show指令：
```html
<div v-show={this.show}></div>
```

### v-if 
```html
<!-- v-if -->
{true && <div>div</div>}
{true ? <div>div</div> : <span>span</span>}
```

### v-for
```html
{ [1, 2, 3].map(item => (<div key={item}>{ item }</div>))}
```

### v-on
```html
<button onClick={this.handleClick}>点击事件</button>
<button on-click={this.handleClick}>点击事件</button>
<!-- 对应@click.native -->
<cmp-button nativeOnClick={this.handleClick}>原生点击事件</cmp-button>
<!-- 传递参数 -->
<button onClick={e => this.handleClick(this.id)}>触发点击事件时，传递参数</button>
```

### v-bind
```html
<input value={this.value} />
```

在JSX中可以直接使用class="xx"来指定样式类，内联样式可以直接写成style="xxx"
```html
<div class="a b" style="font-size: 12px;">Content</div>
<div class={{a: true, b: false}}>Content</div>
<div style={{color: 'red', fontSize: '14px'}}>Content</div>
```

### v-model
有相应的插件 支持 v-model，所以可以直接使用：

```html
<input type="text" v-model={this.value} />
```

### v-slot
```html
<my-cmp>
  默认插槽
  <div slot="a">具名插槽 a</div>
</my-cmp>
```

### v-pre
### v-cloak
### v-once
以上三个指令，不常用，无替代方案

## Ref 
```html
<div ref="xxx">xxx</div>
```

当遍历元素或组件时，如：
```js
[1, 2, 3].map(item => <div ref="xx" key={ item }>{ item }</div>)
```
会发现从 this.$refs.xxx 中获取的并不是期望的数组值，此时就需要将refInFor属性设置为true了：
```js
[1, 2, 3].map(item => <div ref="xx" refInFor={true} key={item}>{ item }</div>)
```

## 自定义指令
```js
render () {
  // 1
  return (
    <input v-splice={{value: this.value, modifiers: {number: true }}}/>
  )

  // 2
  const directives = [
    { 
      name: 'splice', 
      value: this.value,  
      modifiers: {number: true }
    }
  ];

  return (
    <div {...{ directives} }></div>
  )
}
```

## 过滤器
```html
<!-- 正常使用过滤器 -->
<div>{{ msg | capitalize }}</div>

<!-- 在jsx中使用过滤器 -->
<div>{ this.$options.filters('capitalize')(this.msg)}</div>
```


## 插槽
模板写法：
```html
<!-- 组件内 -->
<div class="demo">
  <slot name="header"></slot>
  <slot></slot>
</div>

<!-- 使用时 -->
<my-cmp>
  default
  <template v-slot:header>header</template>
</my-cmp>
```

JSX写法：
```html
<!-- 组件内 -->
<div class="demo">
  { this.$slots.header }
  { this.$slots.default }
</div>

<!-- 使用时 -->
<my-cmp>
  default
  <template slot="header">header</template>
</my-cmp>
```

作用域插槽：
模板写法：
```html
<!-- 组件内 -->
<div class="demo">
  <slot :text="'HelloWorld'"></slot>
</div>

<!-- 使用时 -->
<my-cmp v-slot="slotProps">
  {{ slotProps.text }}
</my-cmp>
```

JSX写法：
```html
<!-- 组件内 -->
<div class="demo">
  { 
    this.$scopedSlots.default({
      text: 'HelloWorld',
    }) 
  }
</div>

<!-- 使用时 -->
<div id="app">
  <base-demo {...{
    scopedSlots: {
      default: props => props.text
    },
  }}></base-demo>
</div>
```

# 函数式组件
当一个组件不需要状态（即响应式数据）、不需要任何生命周期场景、只接受一些props来显示组件时，我们可以将其标记为函数式组件。

```js
functional: true,
```

因为函数式组件只是函数，所以渲染开销会低很多。

在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 props 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。

为了弥补缺少的实例，render 函数提供第二个参数context作为上下文。context包括如下字段：
- props：提供所有 prop 的对象
- slots: 一个函数，返回了包含所有插槽(非作用域)的对象
- scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
- parent：对父组件的引用
- listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是  data.on 的一个别名。
- injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。
- children: VNode 子节点的数组，包含了所有的非作用域插槽和非具名插槽。

## slots() VS children

示例1：
```html
<base-level :level="1" @click="handleClick">

  <template v-slot:header>
    <div>我是头部</div>
  </template>

  <div>div</div>
  <p>p</p>
  <template>template</template>

</base-level>
```
slots()的结果为：
```js
{
  default:[<div>div</div>, <p>p</p>, template],
  header: [<div>我是头部</div>]
}
```

children的结果为：
```
[<div>div</div>, <p>p</p>, template]
```

示例2：

```html
<base-level :level="1" @click="handleClick">

  <template v-slot:header>
    <div>我是头部</div>
  </template>

  <template v-slot:default>
    <div>div</div>
  </template>

  <p>p</p>
  <template>template</template>

</base-level>
```

slots()的结果为：
```js
{
  default:[<div>div</div>],
  header: [<div>我是头部</div>]
}
```

children的结果为：
```
[<div>div</div>, <p>p</p>, template]
```



## 基于模板的函数式组件
在 2.5.0 及以上版本中，如果你使用了单文件组件，那么基于模板的函数式组件可以这样声明：
```html
<template functional>
</template>
```

# 过渡_单元素过渡
Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。

## 单元素/组件的过渡
Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加进入/离开过渡
- 条件渲染 (使用 v-if)
- 条件展示 (使用 v-show)
- 动态组件
- 组件根节点

## 过渡的类名
在进入/离开的过渡中，会有 6 个 class 切换。

<hr />

1. v-enter：
  定义进入过渡的开始状态。
  在元素被插入之前生效，在元素被插入之后的下一帧移除。

2. v-enter-active：
  定义进入过渡生效时的状态。
  在整个进入过渡的阶段中应用，在元素被插入之前生效，在过渡/动画完成之后移除。
  这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。

3. v-enter-to: 
  定义进入过渡的结束状态(2.1.8+) 。
  在元素被插入之后下一帧生效 (与此同时 v-enter 被移除)，在过渡/动画完成之后移除。

<hr />

4. v-leave：
  定义离开过渡的开始状态。
  在离开过渡被触发时立刻生效，下一帧被移除。

5. v-leave-active：
  定义离开过渡生效时的状态。
  在整个离开过渡的阶段中应用，在离开过渡被触发时立刻生效，在过渡/动画完成之后移除。
  这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。

5. v-leave-to: 
  定义离开过渡的结束状态(2.1.8+) 。
  在离开过渡被触发之后下一帧生效 (与此同时 v-leave 被删除)，在过渡/动画完成之后移除。
<hr />

图示：
![过渡](https://cn.vuejs.org/images/transition.png)

## 类名前缀

1. transition 无 name 特性
  类名前缀为 v-。

2. transition 有 name 特性
  如 name 为 fade，则类名前缀为fade-。

## CSS 动画
CSS 动画用法同 CSS 过渡，区别是在动画中 v-enter 类名在节点插入 DOM 后不会立即删除，而是在 animationend 事件触发时删除。

## 自定义过渡的类名
我们可以通过以下 attribute 来自定义过渡类名：

- enter-class
- enter-active-class
- enter-to-class (2.1.8+)
- leave-class
- leave-active-class
- leave-to-class (2.1.8+)

他们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库（如 Animate.css）结合使用十分有用。

Animate.css 官网地址：https://daneden.github.io/animate.css/
安装方式：``npm install animate.css --save``

## 同时使用过渡和动画

可使用 type 属性，来声明需要 Vue 监听的类型，type值可为 animation 或 transition 。

当不设置type时，默认会取 transitioned 和 animationed 两者更长的为结束时刻。

## 显性的过渡时间
在一些情况下，Vue可以自动得出过渡效果的完成时机，从而对dom进行处理。

但是有些时候，我们会设置一系列的过渡效果，例如嵌套元素也有过渡动效，其过渡效果的时间长于父元素。此时我们可以设置duration属性，定制一个显性的过渡持续时间（以毫秒记）：

```html
<transition :duration="1000">...</transition>
```

也可以定制进入和移出的持续时间：
```html
<transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

## 初始渲染的过渡
可以通过 ``appear`` attribute 设置节点在初始渲染的过渡。

和进入/离开过渡一样，同样也可以自定义 CSS 类名。如：
```js
appear-class="appear-enter"
appear-active-class="appear-enter-active"
appear-to-class="appear-enter-to"
```

## JavaScript 钩子
可以在属性中声明 JavaScript 钩子:

```html
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"

  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

- before-enter 动画入场前，可以在其中设置元素开始动画之前的起始样式
- enter 动画入场中，可以在其中写动画
- after-enter 动画完成后
- enter-cancelled 取消动画

对于仅使用 JavaScript 过渡的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。

设置了 appear 特性的 transition 组件，也存在自定义 JavaScript 钩子：
```html
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

> 结合 Velocity.js

Velocity.js 官网地址：http://velocityjs.org/
安装方式: ``npm install velocity-animate``

# 过渡_多元素过渡

当切换展示的元素标签名相同时，需要给每一个元素设置不同的key值，否则Vue为了效率只会替换相同标签内部的内容。

```html
<transition>
  <div v-if="show" key="world">hello world</div>
  <div v-else key="shanshan">hello shanshan</div>
</transition>
```

在一些场景中，可以通过给同一个元素的key值设置不同的状态来替代 v-if 和 v-else。如：

```html
<transition>
  <div :key="keyName">hello {{ key Name}}</div>
</transition>
```

```js
keyName: 'world',
```

## 过渡模式
Vue提供一个一个 mode 特性，可以给多个元素过渡应用不同的模式，mode 的值可为：

- in-out：新元素先进行过渡，完成之后当前元素过渡离开。
- out-in：当前元素先进行过渡，完成之后新元素过渡进入。

## 多组件过渡
我们可以使用动态组件切换展示不同的组件。

# 过渡_列表过渡
当想要给一个列表添加过渡动效时，我们可以使用 ``<transition-group>`` 组件。

该组件的特点：
- 不同于 <transition>，它会以一个真实元素呈现：默认为一个 ``<span>``。你也可以通过 tag attribute 更换为其他元素。
- 过渡模式不可用，因为我们不再相互切换特有的元素。
- 内部元素 总是需要 提供唯一的 key 属性值。
- CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。

## 列表的排序过渡
``<transition-group>`` 组件提供了一个新的特性：v-move，它会在元素改变定位的过程中应用。
如何使用？通过类名即可设置：.v-move {}。
当给 ``<transition-group>`` 设置 name 特性时，例如name为fade，则 v-move 在使用时，需要替换为 fade-move。

注意：当移除一个列表元素时，需要将移除的元素脱离文档流，否则，要溢出的元素在移除过渡中一直处于文档流中，会影响到后面元素的move过渡效果。

内部的实现：Vue 使用了一个叫 FLIP 简单的动画队列，使用 transforms 将元素从之前的位置平滑过渡新的位置。

需要注意的是使用 FLIP 过渡的元素不能设置为 display: inline 。作为替代方案，可以设置为 display: inline-block 或者放置于 flex 中。

## 列表的交错过渡
如果要给列表中的元素，应用更丰富的过渡效果，可以配合JavaScript钩子。

# 过渡_复用过渡
过渡可以通过 Vue 的组件系统实现复用。要创建一个可复用过渡组件，你需要做的就是将 <transition> 或者 <transition-group> 作为根组件，然后将任何子组件放置在其中就可以了。

注意：当使用函数式组件复用过渡时，不要设置css作用域。

# 组件_异步组件
在项目中，有些组件不会在第一次进入首屏时加载，而是当执行了某些操作时，才会加载进来，所以此时，我们可以将该组件设置成异步加载，什么时候用，什么时候再加载进来，以达到提升首屏性能的目的。

使用方法：
```js
components: {
  AsyncCmp: () => import (url);
}
```

将多个需要同时加载的组件合并到一个文件中：

```js
components: {
  AsyncCmp1: () => import(/* webpackChunkName: "async" */ 'url'),
  AsyncCmp2: () => import(/* webpackChunkName: "async" */ 'url'),
}
```

异步加载的文件，会在link标签上设置 el="prefech"。浏览器会在空闲时间内下载对应的资源，使用时可以直接从缓存中获取。与之对应的 el="preload"，会及时下载对应的资源。


# VueRouter_基础

## 什么是路由？
路由是根据不同的url地址展现不同的内容或页面。
早期的路由都是后端直接根据url来重载页面实现的，即后端控制路由。
后来页面越来越复杂，服务器压力越来越大，随着ajax（异步刷新技术）的出现，页面的实现非重载就能刷新数据，让前端也可以控制url自行管理，前端路由由此而生。

## 什么时候使用前端路由？
前端路由更多用在单页应用上，也就是SPA(Single Page Web Application)，在单页面应用中，大部分页面结果不变，只改变部分内容的使用。

## 安装路由
> 安装：``npm install vue-router``。

## 使用路由
### JavaScript
1. 引入路由
```js
import VueRouter from 'vue-router';
```

2. 使用路由
```js
Vue.use(VueRouter);
```

3. 定义路由组件
```js
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
```

4. 定义路由
```js
// 每个路由应该映射一个组件
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
```

5. 创建 router 实例，然后传 `routes` 配置
```js
const router = new VueRouter({
  routes 
})
```

6. 创建和挂载根实例
```js
const app = new Vue({
  router
}).$mount('#app')
```

### html
```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```




## router-link class
- router-link-exact-active 当前展示路径完全匹配组件to属性的值
- router-link-active  当前展示路径包含to属性的值

> 更改class名
```js
VueRouter({
  linkActiveClass: 'link-active',
  linkExactActiveClass: 'link-exact-active',
})
```

## hash模式
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

## history 模式
如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
在路由配置中设置：
```js
VueRouter({
  mode: 'history',
})
```
当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id, 也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。

# VueRouter_命名路由-嵌套路由-重定向-别名

## 命名路由
可以通过一个名称标识一个路由，这样在某些时候会显得更方便一些，特别是在链接一个路由，或者是执行一些跳转时，可以在创建Router实例时，在routes配置中给某个路由设置名称：
```js
routes = [
  {
    path: '/activity/personal',
    name: 'personal',
    component: Personal,
  }
];
```
要链接到一个命名路由，可以给 ``router-link`` 的 to 属性传一个对象：
```html
<router-link :to="{ name: 'personal' }">个人中心</router-link>
```

## 嵌套路由
一个被 router-view 渲染的组件想要包含自己的嵌套 router-view 时，可以使用嵌套路由，如：
```js
{
  path: '/activity',
  component: () => import('./views/Activity'),
  children: [
    {
      path: '/activity/academic',
      name: 'academic',
      component: () => import('./views/Academic'),
    },
    {
      path: '/activity/personal',
      name: 'personal',
      component: () => import('./views/Personal'),
    },
    {
      path: '/activity/download',
      name: 'download',
      component: () => import('./views/Download'),
    }
  ],
}
```
经过这样的设置，在 Activity 组件中就可以使用 router-view 了。
子路由的path可以简写：
```js
path: 'personal'
```
这样会自动将父路由的路径，拼接在子路由前，最终结果为：/activity/personal。

当访问 /activity 下的其他路径时，并不会渲染出来任何东西，如果想要渲染点什么，可以提供一个空路由：
```js
{
  path: '/activity',
  children: [
    {
      path: '',
      component: () => import('./views/Academic'),
    },
  ],
}
```

## 重定向
重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b
```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```
重定向的目标也可以是一个命名的路由：
```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```
甚至是一个方法，动态返回重定向目标：
```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

## 别名
“重定向”的意思是，当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b，那么“别名”又是什么呢？

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

上面对应的路由配置为：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

# VueRouter_编程式的导航
通过在 Vue 根实例的 router 配置传入 router 实例，\$router、 \$route 两个属性会被注入到每个子组件。

## $router
路由实例对象。

除了使用  ``<router-link>`` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例
方法，通过编写代码来实现。

### $router.push
想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 ``<router-link>`` 时，这个方法会在内部调用，所以说，点击 ``<router-link :to="...">`` 等同于调用 \$router.push(...)。

声明式 | 编程式
:-: | :-:
``<router-link :to="...">`` | this.$router.push(...) 

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
```js
// 字符串
this.$router.push('home')

// 对象
this.$router.push({ path: 'home' })

// 命名的路由
this.$router.push({ name: 'user' })
```

### $router.replace
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是替换掉当前的 history 记录。

声明式 | 编程式
:-: | :-:
``<router-link :to="..." replace>`` | this.$router.replace(...) 

### $router.go(n)
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。

```js
// 在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)

// 后退一步记录，等同于 history.back()
this.$router.go(-1)

// 前进 3 步记录
this.$router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
this.$router.go(-100)
this.$router.go(100)
```

## $route
只读，路由信息对象。

### $route.path
字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。

### $route.params
一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。

### $route.query
一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 \$route.query.user == 1，如果没有查询参数，则是个空对象。

### $route.hash
路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串。

### $route.fullPath
完成解析后的 URL，包含查询参数和 hash 的完整路径。

### $route.matched
一个数组，包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 routes 配置数组中的对象副本 (还有在 children 数组)。
    ```js
      const router = new VueRouter({
        routes: [
          // 下面的对象就是路由记录
          {
            path: '/foo',
            component: Foo,
            children: [
              // 这也是个路由记录
              { path: 'bar', component: Bar }
            ]
          }
        ]
      })
    ```

    当 URL 为 /foo/bar，\$route.matched 将会是一个包含从上到下的所有对象 (副本)。

### $route.name
当前路由的名称，如果有的话

### $route.redirectedFrom
如果存在重定向，即为重定向来源的路由的名字。

# VueRouter_动态路由匹配
当我们需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中使用“动态路径参数”来达到这个效果：
```js
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```
经过这样的设置，像 /user/foo 和 /user/bar 都将映射到相同的路由。

一个“路径参数”使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用。

# VueRouter_命名视图-路由组件传参

## 命名视图
想同时展示多个视图时，并且每个视图展示不同的组件时，可以使用命名视图。

可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：
```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

## 路由组件传参
在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

使用 props 将组件和路由解耦。

### 布尔模式
如果 props 被设置为 true，route.params 将会被设置为组件属性。

### 对象模式
如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。
```js
const router = new VueRouter({
  routes: [
    { 
      path: '/promotion/from-newsletter', 
      component: Promotion, 
      props: { newsletterPopup: false } 
    }
  ]
})
```

### 函数模式
你可以创建一个函数返回 props。函数的第一个参数是 route （即$route）。
```js
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```

# VueRouter_导航守卫
导航：路由正在发生变化。

导航守卫主要用来通过跳转或取消的方式守卫导航。

导航守卫被分成三种：全局的、单个路由独享的、组件内的。

## 全局守卫
是指路由实例上直接操作的钩子函数，触发路由就会触发这些钩子函数。

### 全局前置守卫 beforeEach
在路由跳转前触发，一般被用于登录验证。

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

参数说明：
- to 目标路由对象
- from 即将要离开的路由对象
- next 三个参数中最重要的参数。
  - 必须调用next()，才能继续往下执行一个钩子，否则路由跳转会停止
  - 若要中断当前的导航，可以调用next(false)。
  - 可以使用next跳转到一个不同的地址。终端当前导航，进入一个新的导航。next参数值和$routet.push一致。
  - next(error)。2.4+，如果传入的参数是一个Error实例，则导航会被终止，且该错误会被传递给router.onError() 注册过的回调。

### 全局解析守卫 beforeResolve
和boforeEach类似，路由跳转前触发。

和beforeEach的区别：在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

```js
const router = new VueRouter({ ... })

router.beforeResolve((to, from, next) => {
  // ...
})
```

### 全局后置钩子 afterEach
和beforeEach相反，路由跳转完成后触发。
```js
const router = new VueRouter({ ... })

router.afterEach((to, from) => {
  // ...
})
```

## 路由独享守卫
是指在单个路由配置的时候也可以设置的钩子函数。

### beforeEnter
和beforeEach完全相同，如果都设置则在beforeEach之后紧随执行。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

## 组件内守卫
是指在组件内执行的钩子函数，类似于组件内的生命周期，相当于为配置路由的组件添加的生命周期钩子函数。

### beforeRouteEnter
路由进入之前调用。

在该守卫内访问不到组件的实例，this值为undefined。在这个钩子函数中，可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数，可以在这个守卫中请求服务端获取数据，当成功获取并能进入路由时，调用next并在回调中通过 vm访问组件实例进行赋值等操作，（next中函数的调用在mounted之后：为了确保能对组件实例的完整访问）。

```js
beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    next( vm => {
    // 通过 `vm` 访问组件实例
  })
  },
```

### beforeRouteUpdate
在当前路由改变时，并且该组件被复用时调用，可以通过this访问实例。

何时组件会被复用？
- 动态路由间互相跳转
- 路由query变更

```js
beforeRouteUpdate (to, from, next) {
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 可以访问组件实例 `this`
},
```

### beforeRouteLeave
导航离开该组件的对应路由时调用，可以访问组件实例this。

```js
beforeRouteLeave (to, from, next) {
  // 导航离开该组件的对应路由时调用
  // 可以访问组件实例 `this`
}
```

## 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

# VueRouter_路由元信息
定义路由的时候可以配置 meta 字段，用于自定义一些信息。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          meta: { requiresLogin: true }
        }
      ]
    }
  ]
})
```

# VueRouter_过渡动效-滚动行为
## 过渡动效
<router-view> 是基本的动态组件，所以我们可以用 <transition> 组件给它添加一些过渡效果。

```html
<transition>
  <router-view></router-view>
</transition>
```

## 滚动行为
使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。vue-router 可以自定义路由切换时页面如何滚动。

注意: 这个功能只在支持 history.pushState 的浏览器中可用。

当创建一个 Router 实例，你可以提供一个 scrollBehavior 方法：

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

scrollBehavior 方法接收 to 和 from 路由对象。第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。

scrollBehavior 返回滚动位置的对象信息，长这样：

- { x: number, y: number }
- { selector: string, offset? : { x: number, y: number }} (offset 只在 2.6.0+ 支持)

```js
scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}
```

```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash // selector 的 值为 hash值
    }
  }
}
```

# Vuex_State
Vuex是vue的状态管理工具，为了更方便的实现多个组件共享状态。

## 安装
```js
npm install vuex --save
```

## 使用
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  }
})

new Vue({
  store,
})
```

## State
单一状态树，使用一个对象就包含了全部的应用层级状态。

### 在Vue组件中获得Vuex状态
Vuex 通过store 选项，提供了一种机制将状态从跟组件“注入”到每一个子组件中（调用Vue.use(Vuex)）。

通过在根实例中注册store选项，该store实例会注入到根组件下的所有子组件中，且子组件能通过this.\$store访问。
```html
<div class="home">
  {{ $store.state.count }}
</div>
```

### mapState 辅助函数
当一个组件需要获取多个状态时，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用mapState辅助函数帮助我们生成计算属性：

```js
import { mapState } from 'vuex';

computed: {
  ...mapState(['count']),
},

```
使用不同的名字：
```js
computed: {
  ...mapState({
    storeCount: state => state.count,
    // 简写
    storeCount: 'count', // 等同于 state => state.count
  }),
},

```

# Vuex_Getter
store的计算属性。getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接收state作为其第一个参数、getters作为其第二个参数。

```js
getters: {
  doubleCount (state) {
    return state.count * 2;
  }
}
```

## 通过属性访问
Getter会暴露为store.getters对象：``this.$store.getters.doubleCount``

## 通过方法访问
也可以让getter返回一个函数，来实现给getter传参
```js
getters: {
  addCount: state => num => state.count + num;
}
```
```js
this.$store.addCount(3);
```

## mapGetters 辅助函数
```js
import { mapsGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'doubleCount',
      'addCount',
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：
```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  storeDoubleCount: 'doubleCount'
})
```

# Vuex_Mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

不能直接调用一个mutation handler。这个选项更像是事件注册：“当触发一个类型为``increment``的mutation时，调用次函数。”：
```js
this.$store.commit('increment');
```

## 在组件中提交 Mutation
除了在组件中使用 ``this.$store.commit('xxx')`` 提交 mutation之外，还可以使用 mapMutations 辅助函数：
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## 提交载荷（Payload）
你可以向store.commit传入额外的参数，即mutation的载荷（payload）：
```js
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```
```js
store.commit('increment', 10)
```
在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的mutation会更易读：
```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
```js
store.commit('increment', {
  amount: 10
})
```

## 对象风格的提交方式
提交 mutation 的另一种方式是直接使用包含 type 属性的对象：
```js
store.commit({
  type: 'increment',
  amount: 10
})
```
当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

## 使用常量替代 Mutation 事件类型
把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：
```js
// mutation-types.js
export const COUNT_INCREMENT = 'COUNT_INCREMENT'
```
```js
// store.js
import Vuex from 'vuex'
import { COUNT_INCREMENT } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    [COUNT_INCREMENT] (state) {
      // ...
    }
  }
})
```
用不用常量取决于自己，在需要多人协作的大型项目中，这会很有帮助。

## Mutation 需遵守 Vue 的响应规则
既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

- 最好提前在你的 store 中初始化好所有所需属性。
- 当需要在对象上添加新属性时，你应该
  - 使用 Vue.set(obj, 'newProp', 123), 或者
  - 以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：
    ```js
    state.obj = { ...state.obj, newProp: 123 }
    ```

## 表单处理
在Vuex的state上使用v-model时，由于会直接更改state的值，所以Vue会抛出错误。

如果想要使用双向数据的功能，就需要自己模拟一个v-model: :value="msg" @input="updateMsg"。

### 双向绑定的计算属性
上面的做法，比v-model本身繁琐很多，所以我们还可以使用计算属性的setter来实现双向绑定：
```html
<input v-model="msg">
```

```js
computed: {
  msg: {
    get () {
      return this.$store.state.obj.msg;
    },
    set (value) {
      this.$store.commit(UPDATE_MSG, { value });
    }
  }
}
```

## Mutation 必须是同步函数
要记住 **mutation 必须是同步函数**。why？

```js
mutations: {
  [COUNT_INCREMENT] (state) {
    setTimeout(() => {
      state.count ++;
    }, 1000)
  },
}
```
执行上端代码，我们会发现更改state的操作是在回调函数中执行的，这样会让我们的代码在devtools中变的不好调试：当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用，任何在回调函数中进行的状态的改变都是不可追踪的。

## 严格模式
开启严格模式，仅需在创建 store 的时候传入 strict: true：

```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```
在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

### 开发环境与发布环境
不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更，要确保在发布环境下关闭严格模式，以避免性能损失。

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```

# Vuex_Action
Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters:

```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit('increment')
    }
  }
})
```

## 分发Action
```js
store.dispatch('increment')
```
虽然和mutation差不多，但是在action中，可以执行异步操作，但是mutation中不行！！！
```js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```


## 组合 Action
Action 通常是异步的，那么如何知道 action 什么时候结束呢？
```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```
```js
store.dispatch('actionA').then(() => {
  // ...
})
```

## Vuex 管理模式
![](https://vuex.vuejs.org/vuex.png)

# Vuex_Module
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter。

```js
modules: {
  a,
  b
}
```
- 获取 state：this.\$store.state.moduleName.xxx
- 获取 getter：this.\$store.getters.xxx
- 提交 mutation：this.\$store.commit('xxx');
- 分发 action：this.\$store.dispatch('xxx');
- 可以通过mapXXX的方式拿到getters、mutations、actions，但是不能拿到state，如果想通过这种方式获得state，需要加命名空间。

## 命名空间
可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
- 获取 state：this.\$store.state.moduleName.xxx
- 获取 getter：this.\$store.['moduleName/getters'].xxx
- 提交 mutation：this.\$store.commit('moduleName/xxx');
- 分发 action：this.\$store.dispatch('moduleName/xxx');
- 可以通过mapXXX的方式获取到state、getters、mutations、actions。

## 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState。

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来。