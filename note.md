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