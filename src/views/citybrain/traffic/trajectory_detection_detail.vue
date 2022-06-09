<template>
    <div>
        <el-card>
            <el-table :data="datas" max-height="400">
                <el-table-column
                        prop="true_lat"
                        label="真实纬度">
                </el-table-column>
                <el-table-column
                        prop="true_lng"
                        label="真实经度">
                </el-table-column>
                <el-table-column
                        prop="anomaly_lat"
                        label="测试纬度">
                </el-table-column>
                <el-table-column
                        prop="pred_label"
                        label="预测结果">
                </el-table-column>
                <el-table-column
                        prop="true_label"
                        label="真实结果">
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
        name: "trajectory_detection_detail",
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
                return axios.$get(comm.Traj_Url + 'getDetectionDetail', parmas).then(res => {
                    let len = res.true_lat.length;
                    for (let i = 0; i < len; i++) {
                        this.datas.push({
                            'true_lat': res.true_lat[i],
                            'true_lng': res.true_lng[i],
                            'anomaly_lat': res.anomaly_lat[i],
                            'anomaly_lng': res.anomaly_lng[i],
                            'pred_label': res.pred_label[i],
                            'true_label': res.true_label[i],
                        });
                        let temp = {
                            'anomaly_lat': res.anomaly_lat[i],
                            'anomaly_lng': res.anomaly_lng[i],
                            'true_label': res.true_label[i],
                        };
                        this.positions.push(temp)
                    }
                })
            },
            setMarkers() {
                this.positions = JSON.parse(JSON.stringify(this.positions));

                this.positions.forEach(item => {
                    let tip = `${item.anomaly_lng ? "经度: " + item.anomaly_lng + "<br>" : ""}
            ${item.anomaly_lat ? "纬度: " + item.anomaly_lat + "<br>" : ""}`;
                    let color = item.true_label == 1 ? '#ff000e' : '#49ff3d'
                    let marker = L.circle(L.latLng(item.anomaly_lat, item.anomaly_lng), {
                        color: color,
                        fillColor: color,
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

            this.queryDetailData().then(res => {
                this.setMarkers();
                this.vuexMap.setView(L.latLng(this.datas[0].true_lat, this.datas[0].true_lng), 13)
            })
        },
    }
</script>

<style scoped>

</style>
