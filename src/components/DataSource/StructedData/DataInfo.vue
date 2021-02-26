<template>
  <div>
    <!--卡片视图区域-->
    <el-card>
      <!--搜索与添加区域-->
      <el-row :gutter=20>
        <el-col :span=7>
          <!--搜索与添加区域-->
          <el-input placeholder="请输入数据名称" v-model="queryInfo.query" :clearable="true" @clear="">
            <el-button slot="append" icon="el-icon-search" @click=""></el-button>
          </el-input>
        </el-col>

      </el-row>
      <!--用户列表区域-->
      <el-table :data="DataList" border stripe max-height="650">
        <!--缩印列-->
        <el-table-column type="selection" label="#"></el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="名称" prop="username"></el-table-column>
        <el-table-column label="类型" prop="email"></el-table-column>
        <el-table-column label="应用领域" prop="mobile"></el-table-column>
        <el-table-column label="算法" prop="role_name"></el-table-column>
        <el-table-column label="传输协议" prop="role_name"></el-table-column>
        <el-table-column label="数据来源" prop="role_name"></el-table-column>
        <el-table-column label="操作" width="180px" >
            <template slot-scope="scope">
                <!--查看数据详情结点按钮-->
                <el-tooltip class="item" effect="dark" content="查看详情" :enterable="false" placement="top">
                    <!--修改按钮-->
                    <el-button type="primary" icon="el-icon-view" size="mini" @click="gotoDataclean(scope.row)"></el-button>
                </el-tooltip>
                <!--配置结点按钮-->
                <el-tooltip class="item" effect="dark" content="配置结点" :enterable="false" placement="top">
                    <el-button type="warning" icon="el-icon-setting" size="mini" @click="setConfig"></el-button>
                </el-tooltip>
                <!--删除按钮-->
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </template>
        </el-table-column>
      </el-table>
        <el-row style="margin-top: 20px">
            <el-col :span=4>
                <el-button type="primary" @click="addDialogVisible = true">添加外部数据</el-button>
            </el-col>
            <el-col :span=8>
                <el-upload
                        ref="upload"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :file-list="fileList"
                        :auto-upload="false">
                    <el-button slot="trigger"  type="primary">添加本地数据</el-button>
                    <el-button style="margin-left: 10px;"  type="success" @click="submitUpload">上传到服务器</el-button>
                </el-upload>
            </el-col>
        </el-row>
    </el-card>

    <!-- 添加数据源的对话框 -->
    <el-dialog title="添加数据" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体 -->
      <el-form
        :model="addDataForm"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="addDataForm.name"></el-input>
        </el-form-item>
        <el-form-item label="应用领域" prop="region">
          <el-input v-model="addDataForm.region"></el-input>
        </el-form-item>
        <el-form-item label="选择类型">
          <el-select v-model="selectType" placeholder="选择类型">
            <el-option v-for="item in dataType" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="协议">
          <el-select v-model="selectAgreementType" placeholder="选择协议">
            <el-option v-for="item in AgreementType" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="addDataForm.address"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="port">
          <el-input v-model="addDataForm.port"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addDataForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addDataForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button  type="info" @click="testDataSource">测 试</el-button>
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDataSource">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 配置结点的对话框 -->
    <el-dialog title="配置结点" :visible.sync="addNodeVisible" width="70%" @close="addDialogClosed">
      <!-- 内容主体 -->
      <el-form :model="addNodeForm" ref="addFormRef" label-width="130px">
        <h3>云端清洗结点配置</h3>
        <el-form-item label="云端服务器">
          <el-select v-model="selectNode" placeholder="选择云端结点">
            <el-option v-for="item in Node" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="清洗算法">
              <el-select v-model="selectAlgorithmType" placeholder="选择算法">
                  <el-option v-for="item in AlgorithmType" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
          </el-form-item>
        <h3>云边协同清洗结点配置</h3>
        <el-form-item label="云端服务器">
          <el-select v-model="selectNode" placeholder="选择类型">
            <el-option v-for="item in Node" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="清洗算法">
              <el-select v-model="selectAlgorithmType2" placeholder="选择算法">
                  <el-option v-for="item in AlgorithmType" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
          </el-form-item>
        <el-form-item label="边缘端服务器">
          <el-transfer v-model="edgeServer" :data="data"></el-transfer>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addNodeVisible = false">取 消</el-button>
          <el-button type="primary" @click="addNodeVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
    import axios from '../../../api/axios'
  export default {
    data(){
      const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 5; i++) {
          data.push({
            key: i,
            label: `边缘服务器 ${ i }`,
            // disabled: i % 4 === 0
          });
        }
        return data;
      };
      return{
        data: generateData(),
        edgeServer: [1],
        queryInfo: {
          query: '',
          //当前的页数
          pagenum: 1,
          //当前每页显示多少条数据
          pagesize: 2
        },
        DataList:[{username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12},
          {username:"1aw2fr",email:'1243',mobile:12345678909,role_name:'afw',mg_state:12}],
        // 添加用户对话框
        addDialogVisible: false,
        addDataForm:{},
        addUserFormRules:{},
        dataType:[
          {value:0,label:'物理设备'},
          {value:1,label:'虚拟设备'},
          {value:2,label:'数据流'},
          {value:3,label:'第三方系统'},
          {value:4,label:'文件'},
        ],
        selectType:0,
        AgreementType:[
          {value:0,label:'http'},
          {value:1,label:'https'},
          {value:2,label:'mqtt'},
          {value:3,label:'webSocket'},
          {value:4,label:'ftp'},
        ],
        selectAlgorithmType:0,
        selectAlgorithmType2:0,
        AlgorithmType:[
          {value:0,label:'规则校验'},
          {value:1,label:'概率统计'},
          {value:2,label:'自动选择'},
        ],
        addNodeVisible: false,
        addNodeForm:{},
        selectNode:0,
        Node:[
          {value:0,label:'cloudServer01'},
          {value:1,label:'cloudServer02'},
          {value:2,label:'cloudServer03'},
        ],
          fileList:[]
      }

    },
    methods:{
      //配置云边协同操作
      setConfig(row){
        this.addNodeVisible = true;
      },
      //测试数据源
      testDataSource(){
        let param = {
          name:null,
          region:null,
          type:null,
          socket:null,
          address:null,
          port:null,
          username:null,
          password:null
        };
        axios.$get('testData',param).then(res => {

        });
        this.$message.success('数据源连接成功！！！');
      },
      addDataSource(){
        let param = {
          name:null,
          region:null,
          type:null,
          socket:null,
          address:null,
          port:null,
          username:null,
          password:null
        };
        axios.$get('addData',param).then(res => {

        });
        this.addDialogVisible = false;
      },
      // 监听 添加用户对话框的关闭事件
      addDialogClosed () {
        this.$refs.addFormRef.resetFields()
      },
      //进入对比页面
      gotoDataclean(val){
        this.$router.push({path:'/dataclean/datasource/dataCleanResult',query:{
          dataId:val
        }});
       },
        submitUpload() {
          this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        }
    }
  }
</script>

<style scoped>
  .el-card{
    height: 850px;
  }
  .data-oper {
    padding: 20px;
    float:right;
  }
  .upload{
      box-sizing: border-box;
      display: block;
      height: 40px;
  }
</style>
