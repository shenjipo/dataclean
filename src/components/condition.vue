<template>
    <div style="width: 100%">
        <div style="display: flex;justify-content: space-around">
            <el-tag>数据量:{{conditions.total}}</el-tag>
            <el-tag type="danger">脏数据量:{{conditions.realDirtyData}}</el-tag>
            <el-tag type="info">检测到的脏数据量:{{conditions.checkedDirtyData}}</el-tag>
            <el-tag type="success">修复数据量:{{conditions.repairData}}</el-tag>
        </div>
        <div style="display: flex;justify-content: space-around;margin-top: 20px">
            <el-link type="priamry" :underline="false">时间:  {{startTime}}  -  {{endTime}}</el-link>
            <el-tag type="warning">清洗速度:{{cleanSpeed}}条/s</el-tag>
            <el-tag type="warning">错误发现率:{{detection}}%</el-tag>
            <el-tag type="warning">修复率:{{repair}}%</el-tag>
        </div>
    </div>
</template>

<script>
    import {transofrmTimeMs} from "../utils/time";

    export default {
    name: "condition",
    data() {
      return {
        conditions: {
          total: 1000,
          realDirtyData: 200,
          checkedDirtyData: 190,
          repairData: 180,
          startTime: 1625452099888,
          endTime: 1625452100888
        },
      }
    },
    computed: {
      cleanSpeed() {
        return (this.conditions.total / (this.conditions.endTime - this.conditions.startTime)).toFixed(2)
      },
      repair() {
        return (this.conditions.repairData / this.conditions.checkedDirtyData).toFixed(2)
      },
      detection() {
        return (this.conditions.checkedDirtyData / this.conditions.realDirtyData).toFixed(2)
      },
      startTime(){
        return transofrmTimeMs(this.conditions.startTime)
      },
      endTime(){
        return transofrmTimeMs(this.conditions.endTime)
      }
    },
    methods: {
      fn(){

      }
    }
  }
</script>

<style scoped>

</style>
