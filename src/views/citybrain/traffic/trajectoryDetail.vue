<template>
    <div>
        <el-card>
            <el-table :data="datas" max-height="400">
                <el-table-column
                        prop="time"
                        label="时间">
                </el-table-column>
                <el-table-column
                        prop="true_lat"
                        label="真实纬度">
                </el-table-column>
                <el-table-column
                        prop="true_lng"
                        label="真实经度">
                </el-table-column>
                <el-table-column
                        prop="pred_lat"
                        label="修复纬度">
                </el-table-column>
                <el-table-column
                        prop="pred_lng"
                        label="修复经度">
                </el-table-column>
                <el-table-column
                        prop="error"
                        label="误差(米)">
                </el-table-column>
            </el-table>
        </el-card>
        <el-card style="height: 1080px;">
            <Map style="width: 100%;height: 1080px"></Map>
        </el-card>
    </div>
</template>

<script>
    import {comm} from "../../../global/common";
    import Map from '@/views/map/map';
    import axios from '@/api/axios.js';
    import {mapGetters} from "vuex";

    export default {
        name: "trajectoryDetail",
        components: {
            Map
        },
        data() {
            return {
                index: this.$route.params.index,
                datas: [],
                train_markers: [],
                true_markers: [],
                pred_markers: [],
                positions: [],
                marker_group: []
            }
        },
        methods: {
            queryDetailData() {
                let parmas = {
                    index: this.index
                };

                return axios.$get(comm.Traj_Url + 'getTrajectoryDetail', parmas).then(res => {
                    let len = res.pred_lat.length;
                    for (let i = 0; i < len; i++) {
                        this.datas.push({
                            'time': res.train_time_stamp[i],
                            'true_lat': res.true_lat[i],
                            'true_lng': res.true_lng[i],
                            'pred_lat': res.pred_lat[i],
                            'pred_lng': res.pred_lng[i],
                            'error': res.error[i],
                        });
                        let temp = {
                            'train_lat': res.train_lat[i],
                            'train_lng': res.train_lng[i],
                        };
                        this.positions.push(temp)
                    }
                })
            },
            setMarkers() {
                this.positions = JSON.parse(JSON.stringify(this.positions));

                this.positions.forEach(item => {
                    let tip = `${item.train_lng ? "经度: " + item.train_lng + "<br>" : ""}
            ${item.train_lat ? "纬度: " + item.train_lat + "<br>" : ""}`;
                    let marker = L.circle(L.latLng(item.train_lat, item.train_lng), {
                        color: '#ff000e',
                        fillColor: '#ff000e',
                        fillOpacity: 0.50,
                        radius: 10
                    }).unbindTooltip().bindTooltip(tip, {
                        direction: 'right',
                        opacity: 1,
                        className: 'ls_tooltip_ty'
                    }).addTo(this.vuexMap);
                });

                this.datas.forEach(item => {
                    let tip_pred = `${item.pred_lng ? "经度: " + item.pred_lng + "<br>" : ""}
            ${item.pred_lat ? "纬度: " + item.pred_lat + "<br>" : ""}`;
                    let marker_pred = L.circle(L.latLng(item.pred_lat, item.pred_lng), {
                        color: '#49ff3d',
                        fillColor: '#49ff3d',
                        fillOpacity: 0.50,
                        radius: 10
                    }).unbindTooltip().bindTooltip(tip_pred, {
                        direction: 'right',
                        opacity: 1,
                        className: 'ls_tooltip_ty'
                    }).addTo(this.vuexMap);


                    let tip = `${item.true_lng ? "经度: " + item.true_lng + "<br>" : ""}
            ${item.true_lat ? "纬度: " + item.true_lat + "<br>" : ""}`;
                    let marker = L.circle(L.latLng(item.true_lat, item.true_lng), {
                        color: '#ff9079',
                        fillColor: '#ff9079',
                        fillOpacity: 0.50,
                        radius: 10
                    }).unbindTooltip().bindTooltip(tip, {
                        direction: 'right',
                        opacity: 1,
                        className: 'ls_tooltip_ty'
                    }).addTo(this.vuexMap);

                });


            }
        },
        computed: {
            ...mapGetters([
                "vuexMap",
            ])
        },
        created() {
            console.log(this.datas)
            this.queryDetailData().then(res => {
                this.setMarkers();
                this.vuexMap.setView(L.latLng(this.datas[0].true_lat, this.datas[0].true_lng), 13)
            })
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
