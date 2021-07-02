<template>
    <div class="container">
        <el-card>
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div style="display: flex">
                <lineChart :id="id" :option-data="chartOptionData" style="width: 80%"></lineChart>
                <div style="display: flex;flex-flow: column;width: 20%">
                    <el-date-picker
                            style="width: 100%"
                            v-model="choicetime"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            @change="changetime">
                    </el-date-picker>
                </div>

            </div>
        </el-card>
        <el-card>
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div class="tem-label">
                <h1 style="text-align: center">温度实时表</h1>
                <el-table
                        :data="tableData"
                        height="250"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="date"
                            label="日期"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="clock"
                            label="时间"
                            width="180">
                    </el-table-column>
                    <el-table-column
                            prop="temperature"
                            label="温度">
                    </el-table-column>
                    <el-table-column
                            prop="new_temperature"
                            label="修改温度">
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
    </div>
</template>

<script>
  import lineChart from '@/components/echartsGraphs/line/lineChart'

  export default {
    name: "temperatureRealData",
    components: {
      lineChart
    },
    data() {
      return {
        choicetime: null,
        id: 'line',
        tableData: [],
        chartOptionData: {
          name: 'ch1',
          cleanData: [['2021-05-01 03:20:00', 20], ['2021-05-01 03:20:01', 40],],
          dirtyData: [['2021-05-01 03:20:00', 10], ['2021-05-01 03:20:01', 15],]
        },
        deviceName: this.$route.params.name
      }
    },
    created() {
      console.log(this.deviceName)
    },
    methods: {}
  }
</script>

<style scoped>

</style>
