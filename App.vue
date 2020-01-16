<template>
  <div class="app">
    <!-- v-model :value @input :date @choose-date -->

    <date-picker v-model="date"/>
  </div>
</template>

<script>
import DatePicker from './DatePicker';

export default {
  components: {
    DatePicker,
  },  
  data () {
    return {
      date: new Date(),
    }
  },
}
</script>

<style scoped>

</style>