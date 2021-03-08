<template>
    <div>
<!--        <button @click="testing">发请求拿数据</button>-->
        <br>
        <button @click="getStatus();testing()">发请求拿数据</button>
        <span>状态：{{status}}</span>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                status: '',
            }
        },
        computed: {
            // 计算属性
            statusData() { return this.status }
        },
        watch: {
            statusData: function (val) {
                // 当返回的新值为创建中的时候,保持3秒轮询
                if (val !='100') {
                    var timer = setInterval(() => {
                        setTimeout(this.getStatus, 0)
                    }, 500)
                }
                // 当返回的新值为成功的时候,关闭定时器,结束轮询
                if (val =='100') {
                    clearInterval(timer)
                }
                // 当页面关闭的时候,结束轮询,否则就会一直发请求,
                //使用$once(eventName, eventHandler)一次性监听事件
                this.$once('hook:boforeDestory', () => {
                    clearInterval(timer)
                })
            }
        },
        methods: {
            testing(){
                this.$message('开始检测，大约花费15秒')
                axios.get('detection_run_detected_cell_XY',{params: this.flightstarget},
                    {'Access-Control-Allow-Origin':'*'}).then(res2 => {
                    // console.log(res2);
                    // console.log(res2.data[0])
                    // console.log(res2.data[1])
                    this.flightstarget=res2.data[0].quota
                    this.DataList=res2.data[1].data
                    this.$message('检测成功')
                })
            },
            getStatus() {
                axios.get('return_detection_percent',{params: this.flightstarget},
                    {'Access-Control-Allow-Origin':'*'}).then(res => {
                    console.log(res);
                    this.status=res.data
                })
            }
        },
    }
</script>
