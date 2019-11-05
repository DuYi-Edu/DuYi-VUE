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