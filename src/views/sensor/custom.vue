<template>
    <div>
        <el-card>

        </el-card>
    </div>
</template>

<script>
  import {mapGetters, mapMutations} from "vuex";

  export default {
    name: "custom",
    data() {
      return {}
    },
    methods: {},
    computed: {
      ...mapGetters([
        "sensors"
      ]),
      ...mapMutations([
          'SAVEVSENSOR'
      ])
    },
  }
</script>

<style scoped>

</style>
