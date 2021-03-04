<template>
  <div>
<!--    <el-button type="primary" @click="query">清洗</el-button>-->
<!--    <el-form :inline="true" :model="result">-->
<!--      <el-form-item label="清洗记录条数">-->
<!--        <el-input v-model="result.total" placeholder="MB"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="清洗速度">-->
<!--        <el-input v-model="result.speed" placeholder="万条/s"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="清洗时间">-->
<!--        <el-input v-model="result.time" placeholder="s"></el-input>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    <el-form inline="true" :v-model="flightstarget">-->
<!--      <el-form-item label="查准率">-->
<!--        <el-input v-model="flightstarget.p" placeholder=""></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="召回率">-->
<!--        <el-input v-model="flightstarget.r" placeholder=""></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="F1">-->
<!--        <el-input v-model="flightstarget.f" placeholder=""></el-input>-->
<!--      </el-form-item>-->
<!--    </el-form>-->

    <!--卡片视图区域-->
    <el-card>
      <!--用户列表区域-->
      <el-table :data="DataList" border stripe max-height="650">
        <!--缩印列-->
        <el-table-column type="selection" label="#"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="名称" prop="username"></el-table-column>
        <el-table-column label="应用领域" prop="app_area"></el-table-column>
        <el-table-column label="设备类型" prop="equ_type"></el-table-column>
        <el-table-column label="数据源类型" prop="source_type"></el-table-column>
        <el-table-column label="设备物理地址" prop="phy_address"></el-table-column>
        <el-table-column label="设备网络地址" prop="ip_address"></el-table-column>
        <!--<el-table-column label="数据类型" prop="mobile"></el-table-column>-->
        <el-table-column label="清洗状态" prop="role_name">
          <el-tag>未清洗</el-tag>
        </el-table-column>
        <el-table-column label="算法" prop="role_name"></el-table-column>
        <el-table-column label="清洗结果(F1)" prop="role_name">
          <el-tag type="success" @click="showResult">0.8<i class="el-icon-view"></i></el-tag>
        </el-table-column>
        <el-table-column label="操作" width="180px" >
          <template slot-scope="scope">
            <!--配置结点按钮-->
            <el-tooltip class="item" effect="dark" content="配置结点" :enterable="false" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="setConfig"></el-button>
            </el-tooltip>
            <!--查看数据详情结点按钮-->
            <el-tooltip class="item" effect="dark" content="查看详情" :enterable="false" placement="top">
              <!--修改按钮-->
              <el-button type="primary" icon="el-icon-view" size="mini" @click="gotoflightsData(scope.row)"></el-button>
            </el-tooltip>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--卡片视图区域-->
<!--    <el-card>-->
<!--      &lt;!&ndash;用户列表区域&ndash;&gt;-->
<!--      <el-table :data="flightsCleanList" border stripe>-->
<!--        &lt;!&ndash;缩印列&ndash;&gt;-->
<!--        <el-table-column type="index" label="#"></el-table-column>-->
<!--        <el-table-column label="姓名" prop="username"></el-table-column>-->
<!--        <el-table-column label="邮箱" prop="email"></el-table-column>-->
<!--        <el-table-column label="电话" prop="mobile"></el-table-column>-->
<!--        <el-table-column label="角色" prop="role_name"></el-table-column>-->
<!--      </el-table>-->
<!--    </el-card>-->
    <!--分页区域-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
                   layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import axios from '@/api/axios.js'
  export default {
    data(){
      return{
        flightsCleanList:[],
        flightsDirtyList:[],
        flightstarget:{},
        queryInfo: {
          query: '',
          //当前的页数
          pagenum: 1,
          //当前每页显示多少条数据
          pagesize: 2
        },
        DataList: [{username: "数据源1", app_area: '飞机航班', equ_type: "传感器", source_type:"结构化数据", phy_address:"ai小镇", ip_address:"10.5.26.50" , role_name: 'raha'},
          {username: "数据源2", app_area: '飞机航班', equ_type: "传感器", source_type:"结构化数据", phy_address:"ai小镇", ip_address:"10.5.26.51" , role_name: 'raha'},
          {username: "数据源3", app_area: '飞机航班', equ_type: "传感器", source_type:"结构化数据", phy_address:"ai小镇", ip_address:"10.5.26.52" , role_name: 'raha'},
          {username: "数据源4", app_area: '飞机航班', equ_type: "传感器", source_type:"结构化数据", phy_address:"ai小镇", ip_address:"10.5.26.53" , role_name: 'raha'}],
        total: 0,
        result:{
          total:'10万条',
          speed:'2000条/s',
          time:'20s'
        }
      }
    },
    methods:{
      query(){
        axios.$get('raha_detection',{username:'admin',password:123456}).then(res => {
            console.log(res);
          this.flightstarget=res
        });
      },
      gotoflightsData(val) {
        this.$router.push({
          path: '/citybrain/traffic/flightData1', query: {
            dataId: val
          }
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-card{
    height: 350px;
  }
</style>
