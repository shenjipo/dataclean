<template>
    <div>
        <h1>开关状态</h1>
        <el-row :gutter="12">
            <el-col :span="8" style="width: 25%;height:80px;">
                <el-card>
                    <el-switch
                            inactive-text="DI1"
                            v-model="value.DI1"
                            active-color="#00BB00"
                            disabled>
                    </el-switch>
                </el-card>
            </el-col>
            <el-col :span="8" style="width: 25%;height:80px;">
                <el-card >
                    <el-switch
                            inactive-text="DI2"
                            v-model="value.DI2"
                            active-color="#00BB00"
                            disabled>
                    </el-switch>
                </el-card>
            </el-col>
            <el-col :span="8" style="width: 25%;height:80px;">
                <el-card>
                    <el-switch
                            inactive-text="DI3"
                            v-model="value.DI3"
                            active-color="#00BB00"
                            disabled>
                    </el-switch>
                </el-card>
            </el-col>
            <el-col :span="8" style="width: 25%;height:80px;">
                <el-card >
                    <el-switch
                            inactive-text="DI4"
                            v-model="value.DI4"
                            active-color="#00BB00"
                            disabled>
                    </el-switch>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="12">
            <el-col :span="8" style="width: 25%;height:80px;">
                <el-card>
                    <el-switch
                            inactive-text="DO1"
                            v-model="value.DO1"
                            active-color="#00BB00"
                            disabled>
                    </el-switch>
                </el-card>
            </el-col>
            <el-col :span="8" style="width: 25%;height:80px;">
                <el-card >
                    <el-switch
                            inactive-text="DO2"
                            v-model="value.DO2"
                            active-color="#00BB00"
                            disabled>
                    </el-switch>
                </el-card>
            </el-col>
            <el-col :span="8" style="width: 25%;height:80px;">
                <el-card>
                    <el-switch
                            inactive-text="DO3"
                            v-model="value.DO3"
                            active-color="#00BB00"
                            disabled>
                    </el-switch>
                </el-card>
            </el-col>
            <el-col :span="8" style="width: 25%;height:80px;">
                <el-card >
                    <el-switch
                            inactive-text="DO4"
                            v-model="value.DO4"
                            active-color="#00BB00"
                            disabled>
                    </el-switch>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
        data(){
            return {
                sign:0,
                value:{DI1:true,DI2:true,DI3:true,DI4:true,
                    DO1:true,DO2:true,DO3:true,DO4:true,}
            }
        },
        created() {
            this.sign=1
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
                }
                if (sign ==0) {
                    window.clearInterval(this.timer)
                }
                // 当页面关闭的时候,结束轮询,否则就会一直发请求,
                //使用$once(eventName, eventHandler)一次性监听事件
                this.$once('hook:boforeDestory', () => {
                    window.clearInterval(this.timer)
                    this.sign=0
                })
            }
        },
        methods:{
            addtime(){
                var nowtime=parseInt(new Date().getTime()/1000-3)*1000;
                axios.get('/sensor/io/io0001/iodata',{params:{time:nowtime}}).then(res=>{
                    console.log(res.data)
                    for(var i in res.data){
                        if(res.data[i].detectionresult==0){
                            if(res.data[i].name=="DO1"){this.value.DO1=res.data[i].dirtydata}
                            else if(res.data[i].name=="DO2"){this.value.DO2=res.data[i].dirtydata==1?true:false}
                            else if(res.data[i].name=="DO3"){this.value.DO3=res.data[i].dirtydata==1?true:false}
                            else if(res.data[i].name=="DO4"){this.value.DO4=res.data[i].dirtydata==1?true:false}
                            else if(res.data[i].name=="DI1"){this.value.DI1=res.data[i].dirtydata==1?true:false}
                            else if(res.data[i].name=="DI2"){this.value.DI2=res.data[i].dirtydata==1?true:false}
                            else if(res.data[i].name=="DI3"){this.value.DI3=res.data[i].dirtydata==1?true:false}
                            else if(res.data[i].name=="DI4"){this.value.DI4=res.data[i].dirtydata==1?true:false}
                        }
                        else{
                            if(res.data[i].name=="DO1"){this.value.DO1=res.data[i].dirtydata==0?true:false}
                            else if(res.data[i].name=="DO2"){this.value.DO2=res.data[i].dirtydata==0?true:false}
                            else if(res.data[i].name=="DO3"){this.value.DO3=res.data[i].dirtydata==0?true:false}
                            else if(res.data[i].name=="DO4"){this.value.DO4=res.data[i].dirtydata==0?true:false}
                            else if(res.data[i].name=="DI1"){this.value.DI1=res.data[i].dirtydata==0?true:false}
                            else if(res.data[i].name=="DI2"){this.value.DI2=res.data[i].dirtydata==0?true:false}
                            else if(res.data[i].name=="DI3"){this.value.DI3=res.data[i].dirtydata==0?true:false}
                            else if(res.data[i].name=="DI4"){this.value.DI4=res.data[i].dirtydata==0?true:false}
                        }
                    }
                })
            },
        }
    }
</script>
