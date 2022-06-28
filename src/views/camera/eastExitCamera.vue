<template>
    <div>
        <div class="row">
            <h4  style=" text-align:center;">监控视频</h4>
            <video id="videoElement" controls autoplay muted width="1200" height="800" style="padding-left: 40px"></video>
            <!--        <button @click="play">播放</button>-->
        </div>

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
                    type: 'm3u8',
                    isLive: true,
                    hasAudio: false,
                    // url: '../../assets/video/movie.mp4'
                    // url: "http://10.11.24.154:8002/flv?port=1935&app=myapp&stream=test2"
                    url:"http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8"
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
<style>
    .row {
        height: 800px;
        width: 1200px;
        padding-left: 100px;
    }
</style>
