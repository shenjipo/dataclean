<template>
    <div class="map" id="map" ref="map" style="height: 500px "></div>
</template>

<script>
  import { mapGetters } from "vuex";
  import L from '@/plugins/leaflet/leaflet.js'
  export default {
    name: "Map",
    data() {
      return {};
    },
    computed: {
      ...mapGetters([
        "vuexMap"
      ])
    },
    mounted() {
      let that = this;
      let map = L.map("map", {
        center: [31.59, 120.29],
        zoom: 12,
        minZoom: 2,
        editable: true,
        worldCopyJump:false,
        mapChangeControl: true,
        zoomControl: false
      });
      map._$store=this.$stroe;
      map.setMapType("map");
      that.$store.commit("SAVEVUEXMAP", map);
      map.attributionControl.setPrefix("");
      map.attributionControl.setPosition("bottomleft");
      L.control
          .zoom({
            position: "bottomright",
            zoomInTitle: "放大",
            zoomOutTitle: "缩小"
          })
          .addTo(map);
      L.control.scale().addTo(map);
    }
  }
</script>

<style scoped>

</style>