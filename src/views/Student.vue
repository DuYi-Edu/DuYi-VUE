<template>
  <div class="student">
    学员展示
  </div>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
    });
  },
  beforeRouteUpdate (to, from, next) {
    next();
  },
  beforeRouteLeave (to, from, next) {
    next();
  },
  data () {
    return {
      name: 'student',
    }
  },
}
</script>