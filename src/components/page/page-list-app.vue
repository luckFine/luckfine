<style scoped>
.lego{
    width: 100%;
    height: 60px;
    background: rgb(84, 92, 100)
}
.content{
  width: 100%;
  height: 100%;
  position: fixed;
  margin-left: 170px;
}
.add{
  background: rgb(84, 92, 100);
  font-size: 15px;
  height: 30px;
  width: 70px;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  line-height:30px;
  margin:20px;
}
.awit{
    font-size: 40px;
    height: 400px;
    line-height: 400px;
    text-align: center
}
</style>

<template>
<div>
    <div class="lego"></div>
    <page-frame :page='"app"'>
      <div class="content" slot="main">
        <div>
          <template>
            <el-table
              :data="tableData"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}"
              >
              <el-table-column
                prop="wholePage.title"
                label="标题"
                >
              </el-table-column>
              <el-table-column
                prop="createTime"
                label="创建时间"
                sortable
                width="200">
              </el-table-column>
              <el-table-column
                prop="wholePage.creater"
                label="创建者"
                sortable
                width="120">
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button :disabled="scope.row.status==='online'"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row,)">编辑</el-button>
                  <el-button v-if="scope.row.status!=='online'"
                    size="mini"
                    type="primary"
                    @click="publish(scope.row,1)">上线</el-button>
                  <el-button v-else
                    size="mini"
                    type="primary"
                    @click="publish(scope.row,0)">下线</el-button>
                  <el-button v-if="scope.row.status==='online'"
                    size="mini"
                    type="primary"
                    @click="view(scope.row)">查看</el-button>
                  <el-button v-else
                    size="mini"
                    type="primary"
                    @click="preview(scope.row)">预览</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
        <div class="add" @click="addlist">
          新建
        </div>
      </div>
    </page-frame>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import pageFrame from './../base/page-frame'
export default { 
  data() {
    return {
      tableData:'',
      webData:''
    };
  },

  methods: {
      formatter(row, column) {
        return row.address;
      },
      addlist(){
        this.$router.push({name:'editapp'})
      },
      handleEdit(index, row){
        this.$router.push({name:'edit',params:{id:row._id}})
      },
      handleDelete(index, row) {
        // row 为当前整条数据
        this.$store.dispatch('data/deleteItem',{
          id:row._id
        }).then(() => {
          if(this.deleteResult.errCode === 0){
            this.$message({
                message: '删除成功',
                type: 'success'
            });
            setTimeout(() => {
              this.getList()
            },1000)
          }else{
            this.$message.error('删除失败');
          }

        })
      },
      // copyUrl(index, row){
      //   var Url2=document.getElementById("copyText");
      //   Url2.select(); // 选择对象
      //   document.execCommand("Copy"); // 执行浏览器复制命令
      //   alert("复制成功!");
      // },
      publish(activity,status){
        
        this.$store.dispatch('data/publish',{id:activity._id,status:status})
      },
      view(row){
        window.open(`//localhost:8080/activity.html#/${row._id}`);
        // window.location.href=`//localhost:8080/activity.html/#/${row._id}`;
      },
      preview(row){
        this.$router.push({name:'preview',params:{id:row._id}})
      },
      // getList(){
      //   this.$store.dispatch('compontentList/getwebDatatList').then(() => {
      //     console.log(this.webData)
      //     // this.tableData = this.dataList.result
      //   })        
      // }
  },
  components:{
      pageFrame
  },
  computed:mapState({
      dataList: state => state.data.dataList,
      deleteResult: state => state.data.deleteResult
      // webData: state => state.data.webData
  }),
  mounted() {
    // this.getList()
    // console.log(equipmentInfo.getBrowserInfo())
  }
};
</script>

<style scoped>
</style>
