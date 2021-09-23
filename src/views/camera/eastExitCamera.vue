<template>
    <div>
        <el-row :gutter="12">
            <el-col :span="8">
                <video id="videoElement" controls autoplay muted width="600" height="400"></video>
            </el-col>
            <el-col>
                <video id="videoElement2" controls autoplay muted width="600" height="400"></video>
            </el-col>
        </el-row>
        <el-row>
            <el-col>
                <video id="videoElement3" controls autoplay muted width="600" height="400"></video>
            </el-col>
            <el-col>
                <video id="videoElement4" controls autoplay muted width="600" height="400"></video>
            </el-col>
        </el-row>
        <!--        <button @click="play">播放</button>-->
    </div>
</template>

<script>
    import flvjs from 'flv.js'
    export default {
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                flvPlayer:null
            }
        },
        mounted() {
            if (flvjs.isSupported()) {
                var videoElement = document.getElementById('videoElement');
                this.flvPlayer = flvjs.createPlayer({
                    type: 'mp4',
                    isLive: true,
                    hasAudio: false,
                    url: require('../../assets/video/movie.mp4')
                });
                this.flvPlayer.attachMediaElement(videoElement);
                this.flvPlayer.load();
                this.flvPlayer.play();
            }
        },
        methods:{
            play () {
                this.flvPlayer.play();
            }
        }
    }
</script>
