<template>
  <div class="date-picker" v-click-outside>
    <div class="picker-input">
      <span class="input-prefix">
        <i class="iconfont icon-date"></i>
      </span>
      <input 
        type="text" 
        :value="chooseDate" 
      />
    </div>
    <div class="picker-panel" v-if="showPanel">
      <div class="picker-arrow" />
      <div class="picker-body">
        <div class="picker-header">
          <span class="picker-btn iconfont icon-prev-year" @click="onChangeYear('prev')"/>
          <span class="picker-btn iconfont icon-prev-month" @click="onChangeMonth('prev')" />
          <span class="picker-date">
            {{ showDate.year }}年{{ showDate.month+1 }}月
          </span>
          <span class="picker-btn iconfont icon-next-month" @click="onChangeMonth('next')"/>
          <span class="picker-btn iconfont icon-next-year" @click="onChangeYear('next')"/>
        </div>
        <div class="picker-content">
          <div class="picker-weeks">
            <div
              v-for="week in ['日', '一', '二', '三', '四', '五', '六']"
              :key="week"
            >{{ week }}</div>
          </div>
          <div class="picker-days">
            <div
              v-for="date in showDay"
              :key="date.getTime()"
              :class="{
                'other-month': !isCur(date).month,
                'is-select': isCur(date).select,
                'is-today': isCur(date).today,
              }"
              @click="onChooseDate(date)"
            >
              {{ date.getDate() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    'click-outside': {
      bind(el, binding, vnode) {
        const vm = vnode.context;

        document.onclick = function (e) {
          const dom = e.target;
          const isElSon = el.contains(dom);


          if(isElSon && !vm.showPanel) {
            vm.changePanel(true);
          } else if (!isElSon && vm.showPanel) {
            vm.changePanel(false);
          }

        }
      },
    },
  },
  model: {
    prop: 'date',
    event: 'choose-date',
  },
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    }
  },
  computed: {
    chooseDate () {
      const { year, month, day } = this.getYearMonthDay(this.date);
      return `${year}-${month+1}-${day}`;
    },
    showDay () {
      const { year, month } = this.showDate;
      const firstDay = new Date(year, month, 1);
      const week = firstDay.getDay();
      const startDay = firstDay - week * 24 * 60 * 60 * 1000;
      var arr = [];

      for(let i = 0; i < 42; i ++) {
        arr.push(new Date( startDay + i * 24 * 60 * 60 * 1000));
      }

      return arr;
    },
  },
  data () {
    return {
      showPanel: false,
      showDate: {
        year: 0,
        month: 0,
        day: 0,
      },
    }
  },
  created () {
    this.getShowDate(this.date);
  },
  methods: {
    changePanel (flag) {
      this.showPanel = flag;
    },
    getShowDate (date) {
      const { year, month, day } = this.getYearMonthDay(date);

      this.showDate = {
        year,
        month,
        day,
      }
    },
    getYearMonthDay (date) {
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();

      return {
        year,
        month,
        day,
      }
    },
    isCur (date) {
      const chooseDate = new Date(this.chooseDate);

      const { year:showYear, month:showMonth } = this.showDate;
      const { year:chooseYear, month:chooseMonth, day:chooseDay } = this.getYearMonthDay(chooseDate);
      const { year:curYear, month:curMonth, day:curDay } = this.getYearMonthDay(new Date());

      const { year, month, day } = this.getYearMonthDay(date);


      return {
        month: year === showYear && month === showMonth,
        select: year === chooseYear && month === chooseMonth && day === chooseDay,
        today: year === curYear && month === curMonth && day === curDay,
      }
    },
    onChooseDate (date) {
      this.$emit('choose-date', date);
      this.changePanel(false);
      this.getShowDate(date);
    },
    onChangeMonth (type) {
      const { year, month, day } = this.showDate;
      const moveMonth = type === 'prev' ? -1 : 1;
      const showDate = new Date(year, month, day);
      showDate.setMonth(month + moveMonth);
      const { year:showYear, month:showMonth } = this.getYearMonthDay(showDate);
      this.showDate.year = showYear;
      this.showDate.month = showMonth;

      // const showDate = new Date(...this.showDate);
      // console.log(showDate);
      // const minMonth = 0;
      // const maxMonth = 11;
      // month += moveMonth;

      // if(month < minMonth) {
      //   month = maxMonth;
      //   year --;
      // } else if (month > maxMonth ){
      //   month = minMonth;
      //   year ++;
      // }

      // this.showDate.month = month;
      // this.showDate.year = year;
    },
    onChangeYear (type) {
      const moveYear = type === 'prev' ? -1 : 1;
      this.showDate.year += moveYear;
    }
  },
}

</script>

<style scoped>
@import "./assets/font.css";

.date-picker {
  display: inline-block;
}

.picker-input {
  position: relative;
}

.picker-input input {
  height: 40px;
  line-height: 40px;
  padding: 0 30px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

.picker-input .input-prefix {
  position: absolute;
  left: 5px;
  width: 25px;
  height: 100%;
  line-height: 40px;
  text-align: center;
  color: #c0c4cc;
}

.picker-panel {
  position: absolute;
  width: 322px;
  height: 329px;
  margin-top: 5px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  background-color: #fff;
}

.picker-panel .picker-arrow {
  position: absolute;
  top: -12px;
  left: 30px;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #ebeef5;
}

.picker-panel .picker-arrow::after {
  position: absolute;
  left: -6px;
  top: 1px;
  content: '';
  display: block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-bottom-color: #fff;
  border-top-width: 0;
}

.picker-panel .picker-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 15px;
  padding-bottom: 10px;
}
.picker-panel .picker-btn {
  margin-right: 5px;
  margin-left: 5px;
  font-size: 12px;
  color: #303133;
  cursor: pointer;
}

.picker-panel .picker-date {
  margin-left: 60px;
  margin-right: 60px;
  font-size: 14px;
  user-select: none;
}

.picker-panel .picker-content {
  padding: 0 10px 10px 10px;
  color: #606266;
  user-select: none;
}

.picker-panel .picker-weeks {
  display: flex;
  justify-content: space-around;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ebeef5;
}

.picker-panel .picker-days {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.picker-panel .picker-days div {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 4px 6px;
  font-size: 12px;
  cursor: pointer;
}

.picker-panel .picker-days div:hover {
  color: #409eff;
}

.picker-panel .picker-days div.is-today {
  color: #409eff;
  font-weight: 700;
}

.picker-panel .picker-days div.is-select {
  border-radius: 50%;
  background-color: #409eff;
  color: #fff;
}


.picker-panel .picker-days div.other-month {
  color: #c0c4cc;
}
</style>