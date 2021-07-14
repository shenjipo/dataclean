<template>
    <div>
        <el-card>
            <condition ref="conditionRef"></condition>
        </el-card>
        <el-card>
            <div style="display: flex;justify-content: space-around">
                <el-date-picker
                        v-model="selectTImes"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                        @change="changeTime"
                >
                </el-date-picker>
                <el-select v-model="sensorType">
                    <el-option v-for="item in options" :key="item.value" :label="item.label"
                               :value="item.value"></el-option>
                </el-select>
                <el-button type="primary" @click="buttonClick">
                    查看指标
                </el-button>
                <el-input-number v-model="num" :min="1" :max="60" label="分钟"></el-input-number>
            </div>
        </el-card>
    </div>
</template>

<script>
  import condition from '../../components/condition'
  import axios from '@/api/axios.js';
  import {comm} from "../../global/common";

  export default {
    name: "index",
    components: {
      condition
    },
    data() {
      return {
        sensorType: 'all',
        selectTImes: null,
        options: [
            {value: 'all', label: '所有传感器'},
          {value: 'distance', label: '距离'},
          {value: 'temperature', label: '激光温度'},
          {value: 'pm2_5', label: 'PM2.5'},
          {value: 'pm10', label: 'PM10'},
          {value: 'pressure', label: '压力'},
          {value: 'ch1', label: '温度1'},
          {value: 'ch2', label: '温度2'},
          {value: 'ch3', label: '温度3'},
          {value: 'ch4', label: '温度4'},
          {value: 'co2', label: '二氧化钛'},
        ],
        fn: null,
        num: 2
      }
    },
    created() {

    },
    beforeDestroy() {
      clearInterval(this.fn)
    },
    mounted() {
      this.fn = setInterval(() => {
        this.getDataByRealTime()
      }, 2000)
    },
    methods: {
      //时间选择事件
      changeTime() {
        clearInterval(this.fn);
        this.getDataByFixedTime();
      },
      //按钮点击事件
      buttonClick() {
        if (this.fn) {
          clearInterval(this.fn);
        }

        this.fn = setInterval(() => {
          this.getDataByRealTime();
        }, 10000);
      },
      //获取指定时间数据
      getDataByFixedTime() {
        let parmas = {
          sensorType: this.sensorType,
          startTime: this.selectTImes[0] / 1000,
          endTime: this.selectTImes[1] / 1000
        };
        this.getData(parmas)
      },
      //获取实时数据
      getDataByRealTime() {
        let currTime = new Date().getTime();
        let parmas = {
          sensorType: this.sensorType,
          startTime: parseInt(currTime / 1000) - 60 * this.num,
          endTime: parseInt(currTime / 1000),
        };
        this.getData(parmas)
      },
      //获取数据
      getData(parmas) {

        axios.$get(comm.WEB_URL + 'test/typeTestQuote', parmas).then(res => {
          res.startTime = parmas.startTime;
          res.endTime = parmas.endTime;
          this.$refs.conditionRef.updateData(res);
        })
      }
    }
  }
</script>

<style scoped>

</style>
