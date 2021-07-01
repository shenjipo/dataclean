<template>
    <div class="container">
        <el-card>
            <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
            <div id="main" style="width: 800px;height:400px;">

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
  export default {
    name: "pm25RealData",
    data(){
      return{
        tableData:[],
        deviceName:this.$route.params.name
      }
    },
    created(){
      console.log(this.deviceName)
    },
    methods:{

    }
  }
</script>

<style scoped>

</style>
