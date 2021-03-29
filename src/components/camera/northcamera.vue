<template>
    <div>
        <video id="videoElement" controls autoplay muted width="600px" height="400px"></video>
        <button @click="play">播放</button>
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
                    url: 'http://1011.hlsplay.aodianyun.com/demo/game.flv'
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
