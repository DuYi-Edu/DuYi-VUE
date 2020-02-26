<template>
  <div class="student">
    <student-add />
    <hr>
    <student-list />
  </div>
</template>

<script>

import StudentAdd from '@/components/StudentAdd';
import StudentList from '@/components/StudentList';


export default {
  components: {
    StudentAdd,
    StudentList,
  }
}
</script>