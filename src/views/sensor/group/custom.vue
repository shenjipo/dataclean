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
        <el-card v-for="(item,index) in sensors" :key="index">
            <div style="display: flex;justify-content: space-around">
                <span>传感器名称: {{item.sensorname}}</span>
            </div>

            <el-table :data="sensorData.get(item.sensorname)" max-height="400">
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
    import condition from '../../../components/condition';
    import axios from '@/api/axios.js';
    import {comm} from "../../../global/common";

    export default {
        name: "custom",
        components:{
            condition
        },
        data(){
            return{
                groupId:this.$route.params.groupId,
                queryInfo:{
                    pageNum:1,
                    pageSize:10,
                    total:0
                },
                sensors:[],
                selectTimes:[],
                sensorData:new Map(),
            }
        },
        methods:{
            buttonClick(){
                let that = this;

                this.sensors.forEach(item => {

                    that.getDataByFixedTime(item)
                })
            },
            //获取固定时间数据
            getDataByFixedTime(val) {

                let params = {
                    sensorname: val.sensorname,
                    starttime: this.selectTimes[0] / 1000,
                    endtime: this.selectTimes[1] / 1000
                };

                this.getData(params,val);
            },
            //获取数据
            //
            getData(params,val) {
                axios.$get(comm.WEB_URL + 'testdata/datalist', params).then(res => {
                    this.sensorData.set(val.sensorname,res)
                    console.log(this.sensorData)
                    //强制刷新组件
                    this.$forceUpdate()
                })
            },
            querySensor(){
                let parmas = {
                    page:this.queryInfo.pageNum,
                    pageSize:this.queryInfo.pageSize,
                    groupId:this.groupId
                }
                axios.$get(comm.WEB_URL+'groupdata/getsensor',parmas).then(res => {
                    console.log(res)
                    this.sensors = res.sensorList;

                })
            }
        },
        mounted() {

            this.querySensor()
        }
    }
</script>

<style scoped>

</style>
