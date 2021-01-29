<template>
    <div>
      <el-form :inline="true" :model="result">
        <el-form-item label="清洗记录条数">
          <el-input v-model="result.total" placeholder="MB"></el-input>
        </el-form-item>
        <el-form-item label="清洗速度">
          <el-input v-model="result.speed" placeholder="万条/s"></el-input>
        </el-form-item>
        <el-form-item label="清洗率">
          <el-input v-model="result.ratio" placeholder="%"></el-input>
        </el-form-item>
        <el-form-item label="清洗时间">
          <el-input v-model="result.time" placeholder="s"></el-input>
        </el-form-item>
      </el-form>

      <!--卡片视图区域-->
      <el-card>
        <!--用户列表区域-->
        <el-table :data="flightsDirtyList" border stripe>
          <!--缩印列-->
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="姓名" prop="username"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="电话" prop="mobile"></el-table-column>
          <el-table-column label="角色" prop="role_name"></el-table-column>
        </el-table>
      </el-card>
      <!--卡片视图区域-->
      <el-card>
        <!--用户列表区域-->
        <el-table :data="flightsCleanList" border stripe>
          <!--缩印列-->
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="姓名" prop="username"></el-table-column>
          <el-table-column label="邮箱" prop="email"></el-table-column>
          <el-table-column label="电话" prop="mobile"></el-table-column>
          <el-table-column label="角色" prop="role_name"></el-table-column>
        </el-table>
      </el-card>
      <!--分页区域-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
                     layout="total, sizes, prev, pager, next, jumper" :total="total">

      </el-pagination>
    </div>
</template>

<script>
export default {
    data(){
      return{
        flightsCleanList:[{username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12}],
        flightsDirtyList:[{username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12}],
        queryInfo: {
          query: '',
          //当前的页数
          pagenum: 1,
          //当前每页显示多少条数据
          pagesize: 2
        },
        total: 0,
        result:{
          total:'10万条',
          speed:'2000条/s',
          ratio:'80',
          time:'20s'
        }
      }
    }
}
</script>

<style lang="less" scoped>
.el-card{
  height: 350px;
}
</style>
