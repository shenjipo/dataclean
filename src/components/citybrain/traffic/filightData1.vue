<template>
    <div>
        <el-button type="primary" @click="query">读取数据</el-button>
        <el-card>
            <el-table  :data="DataList"  border stripe max-height="650">
                <el-table-column label="tuple_id" property="tuple_id"></el-table-column>
                <el-table-column label="src" property="src"></el-table-column>
                <el-table-column label="flight" property="flight"></el-table-column>
                <el-table-column label="sched_dep_time" property="sched_dep_time"></el-table-column>
                <el-table-column label="act_dep_time" property="act_dep_time"></el-table-column>
                <el-table-column label="sched_arr_time" property="sched_arr_time"></el-table-column>
                <el-table-column label="act_arr_time" property="act_arr_time"></el-table-column>
            </el-table>
<!--            {{DataList}}-->
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return {
                DataList:[{"tuple_id":"sdasda","src":"sdasdaf"},],
            }
        },
        methods:{
            async query(){
                const res = await axios.get('detection_dirty_data',{params: this.flightstarget},
                    {'Access-Control-Allow-Origin':'*'});
                this.DataList=res.data;
                console.log(this.DataList)
            },
        }
    }
</script>

<style lang="less" scoped>

</style>
