<template>
  <div>
    <el-form :inline="true" :model="result">
      <el-row>
        <el-col :span="6">
          <el-form-item label="清洗记录条数">
            <el-input v-model="result.total" placeholder="MB" autosize disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="清洗速度">
            <el-input v-model="result.speed" placeholder="万条/s" autosize disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="清洗率">
            <el-input v-model="result.ratio" placeholder="%" autosize disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="清洗时间">
            <el-input v-model="result.time" placeholder="s" autosize disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!--卡片视图区域-->
    <el-card>
      <!--用户列表区域-->
      <el-table :data="CarsDirtyList" border stripe>
        <!--缩印列-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!--分配角色按钮-->
            <el-tooltip effect="dark" content="分配角色" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!--卡片视图区域-->
    <el-card>
      <!--用户列表区域-->
      <el-table :data="CarsCleanList" border stripe>
        <!--缩印列-->
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!--修改按钮-->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!--删除按钮-->
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            <!--分配角色按钮-->
            <el-tooltip effect="dark" content="分配角色" placement="top-start" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
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
        CarsCleanList:[{username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12}],
        CarsDirtyList:[{username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
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
