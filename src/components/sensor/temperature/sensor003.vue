<template>
  <div class="container">
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<!--      <button @click="addtime">start</button>-->
<!--      <button @click="stop">stop</button>-->
      <div id="main" style="width: 800px;height:400px;"></div>
      <div class="block">
        <el-date-picker
                v-model="selectday"
                type="date"
                placeholder="选择日期"
                @change="changeday">
        </el-date-picker>
      </div>
    </el-card>

  </div>

</template>

<script>
  import axios from 'axios'

  var echarts = require('echarts')
  export default {
    data () {
      return {
        sign:"",
        selectday:"",
        option:{},
        datavalue:[
         ],
        dirtydata:[],
        xData:[],
        today:{start:new Date(new Date().toLocaleDateString()).getTime(),
               end:new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 -1
        }
      }
    },
    created() {
        this.getoneday()
      this.sign=1
    },
    mounted(){
      this.chartLine = echarts.init(document.getElementById('main'));
      //折线图数据
//x轴坐标数据

      this.today.end=new Date()
      this.xData=[{ name: 'head', value: [this.today.start, 0] },
        { name: 'end', value: [this.today.end, 0] }]

      this.option = {
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },
        legend: {               //设置区分（哪条线属于什么）
          data:['温度','dirty温度']
        },
        xAxis: {
          type: 'time',
          splitNumber: 5, //可以通过它控制x轴显示的坐标轴的数量
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          //min: 1, //当每条数据之间相差很小，折线图波动不明显时，我们可以设置最小值。
          boundaryGap: [0, '20%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          name:'温度',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.datavalue,
          itemStyle: {
            normal: {
              lineStyle:{
                color:'#00BB00',
                width:2,
                //type:'dotted'
              }
            }
          }
        },
          {
            name:'dirty温度',
            type: 'line',
            symbol: 'circle',//折线点设置为实心点
            symbolSize: 4,   //折线点的大小
            //隐藏点
            //showSymbol: false,
            hoverAnimation: false,
            data: this.dirtydata,
            itemStyle: {
              normal: {
                color: "#ff0000",//折线点的颜色
                lineStyle:{
                  color:'#ff0000',
                  width:0,
                  type:'dotted'
                }
              }
            }
          },
          // {
          //   type: 'line',
          //   showSymbol: false,
          //   data: xData,
          //   itemStyle: { normal: { opacity: 0 } },
          //   lineStyle: { normal: { opacity: 0 } }
          // }
        ]
      };
      this.chartLine.setOption(this.option);
    },
    computed: {
      // 计算属性
      getDate() { return this.sign },
    },
    watch:{
      getDate: function (sign) {
          if(sign==1){
            this.timer = window.setInterval(() => {
              window.setTimeout(this.addtime, 0)
            }, 15000)
          }
        if (sign ==0) {
          window.clearInterval(this.timer)
        }
        // 当页面关闭的时候,结束轮询,否则就会一直发请求,
        //使用$once(eventName, eventHandler)一次性监听事件
        this.$once('hook:boforeDestory', () => {
          window.clearInterval(this.timer)
        })
      }
    },
    methods:{
      start(){
        this.addtime()
      },
      addtime(){
        var nowtime=parseInt(new Date().getTime()/15000)*15000;
        axios.get('/sensor/onetemperature',{params:{time:nowtime}}).then(res=>{
          if(res.data.detectionresult){this.dirtydata.push({ name: res.data.time, value: [res.data.time, res.data.dirtydata] },)
            this.datavalue.push({ name: res.data.time, value: [res.data.time, res.data.repairdata] },)
          }
          else this.datavalue.push({ name: res.data.time, value: [res.data.time, res.data.cleandata] },)
          this.chartLine.setOption(this.option);
          console.log(res)
        })
      },
      stop(){
        this.sign=0;
      },
      changeday(){
        //console.log(this.selectday.getTime())
        this.today.start=this.selectday.getTime()
        this.today.end=this.selectday.getTime() + 24 * 60 * 60 * 1000 -1
        this.datavalue.splice(0,this.datavalue.length)
        this.dirtydata.splice(0,this.dirtydata.length)
        this.getoneday()
      },
      getoneday(){
        axios.get('/sensor/temperature',{params:{starttime:this.today.start,endtime:this.today.end}}).then(res=>{
          //console.log(res)
          for(var i in res.data){
            this.datavalue.push({ name: res.data[i].time, value: [res.data[i].time, res.data[i].cleandata] },)
            if(res.data[i].detectionresult){this.dirtydata.push({ name: res.data[i].time, value: [res.data[i].time, res.data[i].dirtydata] },)}

          }
          this.chartLine.setOption(this.option);
        })
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
