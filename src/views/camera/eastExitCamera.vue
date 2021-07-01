<template>
    <div class="row">
        <div class="col1">
            <h1  style=" text-align:center;">原始视频</h1>
            <video-player  class="video-player vjs-custom-skin"
                           ref="videoPlayer"
                           :playsinline="true"
                           :options="playerOptions"
                           @play="onPlayerPlay($event)"
                           @pause="onPlayerPause($event)"
                           @ended="onPlayerEnded($event)"
            ></video-player>
        </div>
        <div class="col2">
            <h1  style=" text-align:center;">处理后视频</h1>
            <video-player  class="video-player vjs-custom-skin"
                           ref="videoPlayer"
                           :playsinline="true"
                           :options="playerOptions"
                           @play="onPlayerPlay($event)"
                           @pause="onPlayerPause($event)"
                           @ended="onPlayerEnded($event)"
            ></video-player>
        </div>
    </div>
</template>

<script>
    import 'video.js/dist/video-js.css'
    import { videoPlayer } from 'vue-video-player'
    import 'videojs-flash'
    export default {
        components: {
            videoPlayer
        },
        //完整的配置数据（不要的可以直接注释掉）
        data(){
            return {
                playerOptions:{
                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                    autoplay: false, //如果true,浏览器准备好时开始回放。
                    muted: false, // 默认情况下将会消除任何音频。
                    loop: false, // 导致视频一结束就重新开始。
                    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                    language: 'zh-CN',
                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                    // fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                    sources: [{
                        type: "application/x-mpegURL",//这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
                        src: "rtmp://10.0.105.87:1935/myapp/test2" //url地址
                    }],
                    // hls:true, //如果是播放m3u8必须加（需注释掉techOrder,不然会有报错）
                    techOrder: ['flash','flash'], //播放rtmp必须加
                    poster: "", //你的封面地址
                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                    controlBar: {
                        timeDivider: true,
                        durationDisplay: true,
                        remainingTimeDisplay: false,
                        fullscreenToggle: true  //全屏按钮
                    }
                }
            }
        }
    }
</script>

<style lang="less" scoped>

    .row {
        height: 800px;
        width: 1400px;
        padding: 40px;
    }
    .col1 {
        float: left;
        height: 450px;
        width: 600px;
        background-color: #ffffff;
        padding: 20px;
    }
    .col2 {
        float: right;
        height: 450px;
        width: 600px;
        background-color: #ffffff;
        padding: 20px;
    }
    .video1 {
        margin-left: 25px;
    }

</style>
