<template>
  <div class="student-list">
    <div>学生总人数：{{ studentLength }}</div>
    <div>学生列表：</div>
    <ul>
      <li
        v-for="student in studentList"
        :key="student.id"
      >
        姓名: {{ student.name }} 
        年龄：{{ student.age }}
      </li>
    </ul>
    <hr>
    <div>未成年学生列表：</div>
    <ul>
      <li
        v-for="student in studentJuveniles"
        :key="student.id"
      >
        姓名: {{ student.name }} 
        年龄：{{ student.age }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['studentList']),
    ...mapGetters(['studentLength', 'studentJuveniles'])
  },
}
</script>

<style scoped>
div, li {
  margin-bottom: 15px;
}
</style>