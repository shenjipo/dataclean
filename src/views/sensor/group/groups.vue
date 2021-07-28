<template>
    <div>
        <el-card>
            <!--用户列表区域-->
            <el-table :data="dataList" border stripe max-height="650">
                <!--缩印列-->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="保存时间" prop="name"></el-table-column>
                <el-table-column label="名称" prop="r"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="open(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card>
            <div>
                <el-tag style="margin-left: 20px"
                        closable
                        @close="removeSensor(item)"
                        v-for="(item,index) in sensors"
                        :key="index">{{item.name}}
                </el-tag>
            </div>
            <div style="display: flex;justify-content: center;margin-top: 20px">
                <el-button type="primary" size="mini" @click="saveVisible = true">保存</el-button>
            </div>
        </el-card>
        <el-dialog title="保存当前分组"
                  @close="saveVisible = false"
                   width="30%"
                   :visible="saveVisible">
            <el-form :model="form">
                <el-form-item label="组名">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="保存时间">
                    <el-input v-model="form.time"></el-input>
                </el-form-item>
                <el-form-item label="当前的传感器">
                    <el-tag style="margin-left: 20px"
                            v-for="(item,index) in sensors"
                            :key="index">{{item.name}}
                    </el-tag>
                </el-form-item>
                <el-form-item >
                    <el-button type="primary" size="mini" @click="saveData">确认</el-button>
                    <el-button type="info" size="mini" @click="saveVisible = false">取消</el-button>
                </el-form-item>
            </el-form>

        </el-dialog>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {transofrmTimeMs} from "../../../utils/time";

  export default {
    name: "groups",
    data() {
      return {
        saveVisible: false,
        form: {
          title: null,
          time: transofrmTimeMs(new Date().getTime())
        },
        dataList:[]
      }
    },
    methods: {
      saveData(){

      },
      open() {

      },
      removeSensor(val) {
        this.$store.commit('RWMOVESENSOR', val);
      }
    },
    computed: {
      ...mapGetters([
        "sensors"
      ]),
    },
    /*
    * 组表  组名 时间(字符串) id
    *存表  组名 时间 传感器数量 id返回给我
    * 传感器表 groupId 名称
    *
    * 存传感器
    * 名称 device_co2_0001,device_co2_0002,device_co2_0003
    * groupId（id）
    *
    * 2个查询接口（分页 page pageSize）
    * 查组 page pageSize
    *
    * 查传感器 id
    * */
  }
</script>

<style scoped>

</style>
