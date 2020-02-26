<template>
  <div class="student-add">
    <div>添加学生：</div>
    <div>
      姓名：<input type="text" v-model="name">
    </div>
    <div>
      年龄：<input type="text" v-model="age">
    </div>
    <button @click="handleClick">添加</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      age: null,
    }
  },
  methods: {
    handleClick () {
      const { name, age } = this;

      this.$store.state.studentList.push({
        name,
        age,
        id: +new Date(),
      })
    }
  },
}
</script>

<style scoped>
div {
  margin-bottom: 15px;
}
</style>