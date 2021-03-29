<template>
  <div class="container">
    <el-card>
      <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
      <button @click="addtime">start</button>
      <button @click="stop">stop</button>
      <div id="main" style="width: 800px;height:400px;"></div>
      <div class="block">
        <el-date-picker
                v-model="value1"
                type="date"
                placeholder="选择日期">
        </el-date-picker>
      </div>
    </el-card>

  </div>

</template>

<script>

  var echarts = require('echarts')
  export default {
    data () {
      return {
        sign:"",
        option:{},
        datavalue:[
         ],
        xData:[],
      }
    },
    created() {

    },
    mounted(){
      this.chartLine = echarts.init(document.getElementById('main'));
      //折线图数据
//x轴坐标数据
      var nowdate=new Date();
      var mouth=nowdate.getMonth()+1;
      var minute=nowdate.getMinutes()+10;
      var headtime=nowdate.getFullYear()+"/"+mouth+"/"+nowdate.getDate()+" "+
              nowdate.getHours()+":"+nowdate.getMinutes()+":"+"00";
      var endtime=nowdate.getFullYear()+"/"+mouth+"/"+nowdate.getDate()+" "+
              nowdate.getHours()+":"+minute+":"+nowdate.getSeconds();
      this.xData=[{ name: 'head', value: [headtime, 0] },
        { name: 'end', value: [endtime, 0] }]

      var xData=this.xData;
      this.option = {
        tooltip: {              //设置tip提示
          trigger: 'axis'
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
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: this.datavalue
        },
          {
            type: 'line',
            showSymbol: false,
            data: xData,
            itemStyle: { normal: { opacity: 0 } },
            lineStyle: { normal: { opacity: 0 } }
          }
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
            }, 1000)
            console.log("789456")
          }
        if (sign ==0) {
          console.log(sign)
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
      change(){
        var date = new Date();
        var today=date.getHours()+":"+date.getMinutes();
        console.log(today);
      },
      start(){
        this.addtime()
      },
      addtime(){
        var nowdate=new Date();
        var mouth=nowdate.getMonth()+1;
        var nowtime=nowdate.getFullYear()+"/"+mouth+"/"+nowdate.getDate()+" "+
                nowdate.getHours()+":"+nowdate.getMinutes()+":"+nowdate.getSeconds();
        var value=(Math.random()*100);
        this.datavalue.push({ name: nowtime, value: [nowtime, value] },)
        this.chartLine.setOption(this.option);
        console.log(this.datavalue)
        this.sign=1;
      },
      stop(){
        this.sign=0;
        var nowdate=new Date();
        var nowtime=nowdate.getHours()+1;
        console.log(nowtime)
      }
    }
  }
</script>
<style lang="less" scoped>

</style>
