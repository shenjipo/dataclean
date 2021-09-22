<template>
    <div>
        <video id="videoElement" controls autoplay muted width="600" height="400"></video>
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
                    type: 'flv',
                    isLive: true,
                    hasAudio: false,
                    url: 'http://10.11.24.154:8002/flv?port=1935&app=myapp&stream=test2'
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
