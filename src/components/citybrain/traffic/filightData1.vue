<template>
    <div>
        <el-card>
            <el-table  :data="DataList.slice((currentPage-1)*pagesize,currentPage*pagesize)"  border stripe max-height="650">
                <el-table-column label="tuple_id" property="tuple_id"></el-table-column>
                <el-table-column label="src" property="src"></el-table-column>
                <el-table-column label="flight" property="flight"></el-table-column>
                <el-table-column label="sched_dep_time" property="sched_dep_time"></el-table-column>
                <el-table-column label="act_dep_time" property="act_dep_time"></el-table-column>
                <el-table-column label="sched_arr_time" property="sched_arr_time"></el-table-column>
                <el-table-column label="act_arr_time" property="act_arr_time"></el-table-column>
                <el-table-column label="是否正确" property=""></el-table-column>
            </el-table>
            <el-pagination small layout="total, prev, pager, next,jumper"
                           :total="DataList.length"
                           :page-size="pagesize"
                           pager-count="10"
                           :current-page="currentPage"
                           @current-change="handleCurrentChange"
            >
            </el-pagination>
            <el-row class="btns">
                <el-button type="primary">检测</el-button>
                <el-button type="success">修复</el-button>
            </el-row>
<!--            {{DataList}}-->
        </el-card>
    </div>
</template>

<script>
import axios from 'axios'
    export default {
        data(){
            return {
                DataList:[],
                pagesize:10,
                currentPage:1,
            }
        },
        created() {
            axios.get('detection_dirty_data',{params: this.flightstarget},
                {'Access-Control-Allow-Origin':'*'}).then(res => {
                    console.log(res);
                    this.DataList=res.data
            })
        },
        methods:{
            handleCurrentChange(val){
                this.currentPage=val;
            }
        }
    }
</script>

<style lang="less" scoped>
    .btns {
        padding-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
</style>
