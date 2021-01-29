<template>
  <div class="row">
    <div class="col1">
      <h1  style=" text-align:center;">原始视频</h1>
      <div class="video"></div>
      <video width="550" height="550" class="video1" controls>
        <source src="src/assets/video/movie.mp4" type="video/mp4">
      </video>
    </div>
    <div class="col2">
      <h1  style=" text-align:center;">处理后视频</h1>
      <div class="video"></div>
      <video width="550" height="550" class="video1" controls>
        <source src="src/assets/video/movie.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
  export default {

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
    height: 650px;
    width: 600px;
    background-color: #ffffff;
  }
  .col2 {
    float: right;
    height: 650px;
    width: 600px;
    background-color: #ffffff;
  }
  .video1 {
    margin-left: 25px;
  }

</style>
