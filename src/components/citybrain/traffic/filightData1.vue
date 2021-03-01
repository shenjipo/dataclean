<template>
    <div>
        <el-form inline="true" :v-model="flightstarget">
            <el-form-item label="查准率">
                <el-input v-model="flightstarget.p" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="召回率">
                <el-input v-model="flightstarget.r" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="F1">
                <el-input v-model="flightstarget.f" placeholder=""></el-input>
            </el-form-item>
        </el-form>


        <el-card>
            <el-table :data="DataList.slice((currentPage-1)*pagesize,currentPage*pagesize)"  border stripe max-height="650" :row-class-name="tableRowClassName">
                <el-table-column label="tuple_id" property="tuple_id"></el-table-column>
                <el-table-column label="src" property="src"></el-table-column>
                <el-table-column label="flight" property="flight"></el-table-column>
                <el-table-column label="sched_dep_time" property="sched_dep_time"></el-table-column>
                <el-table-column label="act_dep_time" property="act_dep_time"></el-table-column>
                <el-table-column label="sched_arr_time" property="sched_arr_time"></el-table-column>
                <el-table-column label="act_arr_time" property="act_arr_time"></el-table-column>

                <el-table-column label="是否正确" property="是否正确数据"
                                 :filters="[{ text: '是', value: '是' }, { text: '否', value: '否' }]"
                                 :filter-method="filterTag"
                                 filter-placement="bottom-end"
                ></el-table-column>

                <el-table-column label="错误字段是" property="错误字段是"></el-table-column>
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
                <el-button type="primary" @click="testing">检测</el-button>
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
                DataList:[{tuple_id:1,"是否正确数据":"是"},{tuple_id:2,"是否正确数据":"否"}],
                flightstarget:{},
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
            query(){
                axios.$get('raha_detection',{username:'admin',password:123456}).then(res => {
                    console.log(res);
                    this.flightstarget=res
                });
            },
            handleCurrentChange(val){
                this.currentPage=val;
            },
            testing(){
                axios.get('detection_run_detected_cell_XY',{params: this.flightstarget},
                    {'Access-Control-Allow-Origin':'*'}).then(res2 => {
                    console.log(res2);
                    this.DataList=res2.data
                    this.$message('检测成功')
                })
            },
          filterTag(value, row){
              console.log(row);
            console.log(value);
            console.log(row.是否正确数据);
            return row.是否正确数据 == value;
          },
            tableRowClassName({row,rowIndex}){
                if(row.是否正确数据==='否'){
                    return 'warning-row';
                }
                console.log(rowIndex);
                return '';
            }
        }
    }
</script>

<style lang="less">
    .btns {
        padding-top: 20px;
        display: flex;
        justify-content: flex-end;
    }

    .el-table .warning-row {
        color: #34c934 !important;
        background: rgba(0,255,255);
    }
</style>
