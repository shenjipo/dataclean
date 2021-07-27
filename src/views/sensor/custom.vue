<template>
    <div>
        <el-card>
            <condition></condition>
        </el-card>
        <el-card>
            <div style="display: flex;justify-content: space-around">
                <el-date-picker
                        v-model="selectTimes"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="timestamp"
                >
                </el-date-picker>
                <el-button type="primary" @click="buttonClick">
                    查看指标
                </el-button>
            </div>
        </el-card>
        <el-card v-for="item in sensors" :key="item.name">
            <div style="display: flex;justify-content: space-around">
                <span>传感器名称: {{item.name}}</span>
                <el-button type="primary" @click="remove(item)">删除</el-button>
            </div>

            <el-table :data="item.datas">
                <el-table-column
                        prop="sensorname"
                        label="设备名称">
                </el-table-column>
                <el-table-column
                        prop="starttime"
                        label="接收数据时间">
                </el-table-column>
                <el-table-column
                        prop="repairtime"
                        label="清洗结束时间">
                </el-table-column>
                <el-table-column
                        prop="cleaningtime"
                        label="清洗用时/秒">
                </el-table-column>
                <el-table-column
                        prop="dirtydata"
                        label="接收值">
                </el-table-column>
                <el-table-column
                        prop="cleandata"
                        label="原始值">
                </el-table-column>
                <el-table-column
                        prop="detectionresult"
                        label="检测结果">
                </el-table-column>
                <el-table-column
                        prop="repairdata"
                        label="修复值">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";
  import condition from '../../components/condition';

  export default {
    name: "custom",
    data() {
      return {
        selectTimes:[]
      }
    },
    components: {
      condition
    },
    methods: {
      buttonClick(){
        let that = this;
        this.sensors.forEach(item => {
          that.getDataByFixedTime(item)
        })
      },
      //获取固定时间数据
      getDataByFixedTime(val) {
        let params = {
          sensorname: val.deviceName,
          starttime: this.choicetime[0] / 1000,
          endtime: this.choicetime[1] / 1000
        };
        this.getData(params);
      },
      //获取数据
      getData(params) {
        axios.$get(comm.WEB_URL + 'testdata/datalist', params).then(res => {
          this.tableData = res;
        })
      },
      remove(val) {
        this.$store.commit('RWMOVESENSOR', val);
      }
    },
    computed: {
      ...mapGetters([
        "sensors"
      ]),
      ...mapMutations([
        'SAVEVSENSOR'
      ])
    },
  }
</script>

<style scoped>

</style>
