<template>
    <div>
        <el-form inline="true" :v-model="flightstarget">
            <el-form-item label="检测查准率">
                <el-input v-model="flightstarget.p" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="检测召回率">
                <el-input v-model="flightstarget.r" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="检测F1">
                <el-input v-model="flightstarget.f" placeholder=""></el-input>
            </el-form-item>
        </el-form>

        <el-form inline="true" :v-model="repairquota">
            <el-form-item label="修复查准率">
                <el-input v-model="repairquota.p" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="修复召回率">
                <el-input v-model="repairquota.r" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="修复F1">
                <el-input v-model="repairquota.f" placeholder=""></el-input>
            </el-form-item>
        </el-form>

        <el-card>
            <el-table :data="DataList" border max-height="650px">
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
                <el-button type="primary" @click="openMap">在地图中显示轨迹</el-button>
                <el-button type="primary" @click="testing">检测</el-button>
                <el-button type="success" @click="repair">修复</el-button>
            </el-row>
            <!--            {{DataList}}-->
        </el-card>

        <div style="width: 100%;height: 600px">
            <Map style="width: 100%;height: 100%"></Map>
        </div>
    </div>
</template>

<script>
  import axios from 'axios'
  import {mapGetters} from "vuex";
  import Map from '@/components/map/map'
  import "@/plugins/leaflet/leaflet.trackplayback.js";
  import customMarkerIcon from '@/assets/round_03.png'
  import 'leaflet-polylinedecorator'
  export default {
    data() {
      return {
        DataList: [
          {tuple_id: 1, "是否正确数据": "是"},
          {tuple_id: 2, "是否正确数据": "否"}],
        flightstarget: {},
        repairquota: {},
        pagesize: 10,
        currentPage: 1,
        res: [
          {lat: 30, lng: 116, time: 1502529980, info: [{key: 'name', value: 'ship1'}]},
          {lat: 32, lng: 118, time: 1502539980, info: [{key: 'name', value: 'ship1'}]},
          {lat: 34, lng: 120, time: 1502549980, info: [{key: 'name', value: 'ship1'}]},
          {lat: 39, lng: 130, time: 1502559980, info: [{key: 'name', value: 'ship1'}]},
          {lat: 33, lng: 116, time: 1502569980, info: [{key: 'name', value: 'ship1'}]},
          {lat: 32, lng: 115, time: 1502579980, info: [{key: 'name', value: 'ship1'}]},
        ],
        trackLineData: [],
        trackGroup: {}
      }
    },
    created() {
      axios.get('detection_dirty_data', {params: this.flightstarget},
          {'Access-Control-Allow-Origin': '*'}).then(res => {
        // console.log(res);
        this.DataList = res.data
      })
    },
    components: {
      Map
    },
    computed: {
      ...mapGetters([
        "vuexMap",
      ])
    },
    methods: {
      setPlayBackData() {
        this.parsingTrack(this.res)
        this.playback = L.trackplayback(
            this.res,
            this.vuexMap,
        );
        this.playback.setSpeed(15);
        this.playback.start();
      },
      parsingTrack(data) {
        let that = this;
        let latLngs = [];
        let track = [];
        let latlng;
        this.trackGroup = L.featureGroup();
        this.trackGroup.addTo(that.vuexMap);
        this.trackGroup.setZIndex(1);
        let markers = [];
        data.forEach((item) => {
          latLngs.push(L.latLng(item.lat, item.lng));
          //轨迹纠偏
          track.push({
            lng: item.lng,
            lat: item.lng,
            dir: null,
            time: item.time
          });
          let tip = `${item.lng ? "经度: " + item.lng + "<br>" : ""}
            ${item.lat ? "纬度: " + item.lat + "<br>" : ""}
            ${item.time ? "航速: " + item.time + "<br>" : ""}`;
          let Icon = L.icon({
            iconUrl: customMarkerIcon,
            iconSize: [16, 16],
            iconAnchor: [8, 8]
          });
          let circleMarker = L.marker(L.latLng(item.lat, item.lng), {
            icon: Icon,
            draggable: false,
            radius: 2,
            color: '#f10808',
            weight: 3,
            opacity: 1,
            fillColor: '#f10808',
            fillOpacity: 1,
          }).unbindTooltip().bindTooltip(tip, {
            direction: 'right',
            opacity: 1,
            className: 'ls_tooltip_ty'
          }).addTo(this.vuexMap);
          markers.push(circleMarker);
          circleMarker.setZIndexOffset(1)
        });
        that.trackLineData.push(track);
        let polyline = L.polyline(latLngs, {
          stroke: !0,
          weight: 2,
          color: "#0073f5",
          opacity: 0.8
        }).addTo(this.vuexMap);
        //this.trackGroup.addLayer(polyline);
        let arrow = L.polylineDecorator(polyline, {
          patterns: [
            {
              offset: 25,
              repeat: 100,
              symbol: L.Symbol.arrowHead({pixelSize: 15, pathOptions: {fillOpacity: 0.8, weight: 0}})
            }
          ]
        }).addTo(this.vuexMap);
      },
      //打开地图
      openMap() {
        this.setPlayBackData()
        //this.$router.push('/dataclean/datasource/trajectoryData/resultInMap');
      },
      query() {
        axios.$get('raha_detection', {username: 'admin', password: 123456}).then(res => {
          // console.log(res);
          this.flightstarget = res
        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      testing() {
        this.$message('开始检测，大约花费15秒')
        axios.get('detection_run_detected_cell_XY', {params: this.flightstarget},
            {'Access-Control-Allow-Origin': '*'}).then(res2 => {
          // console.log(res2);
          // console.log(res2.data[0])
          // console.log(res2.data[1])
          this.flightstarget = res2.data[0].quota
          this.DataList = res2.data[1].data
          this.$message('检测成功')
        })
      },
      repair() {
        this.$message('开始修复，大约花费1分钟')
        axios.get('raha_correction_cell_xy', {params: this.flightstarget},
            {'Access-Control-Allow-Origin': '*'}).then(res2 => {
          // console.log(res2);
          this.DataList = res2.data
          this.$message('修复成功')
        })
      },
      filterTag(value, row) {
        // console.log(row);
        // console.log(value);
        // console.log(row.是否正确数据);
        return row.是否正确数据 == value;
      },
      tableRowClassName({row, rowIndex}) {
        if (row.是否正确数据 === '否') {
          return 'warning-row';
        }
        // console.log(rowIndex);
        return '';
      },
      isRight({row, column, rowIndex, columnIndex}) {
        if ((row.是否正确数据 === '否') && (columnIndex != 8) && (row.错误字段是.indexOf(column.label) > -1)) {
          return 'column-warning';
        }
        // console.log(column);
        // console.log(column.label);
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
        /*color: #34c934 !important;*/
        background: rgba(0, 255, 255, 0.5);
    }

    .el-table .column-warning {
        background: rgba(125, 125, 125, 0.5);
    }
</style>
