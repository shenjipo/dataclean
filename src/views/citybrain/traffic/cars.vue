<template>
    <div>
        <el-card>
            <condition_gps ref="conditionRef"></condition_gps>
        </el-card>

        <el-card>

            <el-table :data="datas">
                <el-table-column
                        prop="carid"
                        label="设备ID">
                </el-table-column>
                <el-table-column
                        prop="time"
                        label="时间">
                </el-table-column>
                <el-table-column
                        prop="cleanlat"
                        label="原始的纬度/秒">
                </el-table-column>
                <el-table-column
                        prop="cleanlng"
                        label="原始的经度">
                </el-table-column>
                <el-table-column
                        prop="lat"
                        label="接收的纬度/秒">
                </el-table-column>
                <el-table-column
                        prop="lng"
                        label="接收的经度">
                </el-table-column>
                <el-table-column
                        prop="repairlat"
                        label="修复后纬度">
                </el-table-column>
                <el-table-column
                        prop="repairlng"
                        label="修复后经度">
                </el-table-column>
                <el-table-column
                        prop="detectionresult"
                        label="检错结果">
                </el-table-column>
                <el-table-column
                        prop="repairresult"
                        label="修复结果">
                </el-table-column>
            </el-table>
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pageNum"
                    :page-size="queryInfo.pagesize"
                    :page-sizes="[10, 20, 50, 100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="queryInfo.total"
            >
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import condition_gps from '../../../components/condition_gps'
    import {comm} from "../../../global/common";

    import axios from '@/api/axios.js';

    export default {
        data() {
            return {
                datas: [],
                queryInfo: {
                    // 当前页数
                    pageNum: 1,
                    // 每页显示多少数据
                    pageSize: 10,
                    total: 0,
                },
            }
        },
        components: {
            condition_gps
        },
        created() {
            this.queryDatas();
            this.getIndex();
        },
        methods: {
            //获取指标数据
            getIndex() {
                axios.$get(comm.WEB_URL+'citybrain/gps/getQuota').then(res => {
                    this.$refs.conditionRef.updateData(res);
                })
            },
            queryDatas() {
                let parmas = {
                    page: this.queryInfo.pageNum,
                    pageSize: this.queryInfo.pageSize
                }
                axios.$get(comm.WEB_URL + 'citybrain/gps/getGpss', parmas).then(res => {
                    axios.$get(comm.WEB_URL+'citybrain/gps/getCount').then(res => {
                        this.queryInfo.total = res;
                    })
                    this.datas = res;
                })
            },
            handleSizeChange(val) {
                this.queryInfo.pageSize = val;
                this.queryDatas();
            },
            handleCurrentChange(val) {
                this.queryInfo.pageNum = val;
                this.queryDatas();
            },
        }
    }
</script>

<style lang="less" scoped>

</style>
