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
</style>

<template>
<div>
    <div class="lego"></div>
    <page-frame :page='"template"'>
      <div class="content" slot="main">
        <div>
            mubn
        </div>
        <div class="add" @click="addlist">
          新建
        </div>
      </div>
    </page-frame>
</div>
</template>

<script>
import pageFrame from './../base/page-frame'
import equipmentInfo from '../../utils/equipmentInfo'
import {
    mapState
} from 'vuex'
export default { 
  data() {
    return {
      tableData:''
    };
  },

  methods: {
      formatter(row, column) {
        return row.address;
      },
      addlist(){
        this.$router.push({name:'/'})
      },
      handleEdit(index, row){
        this.$router.push({name:'/',params:{id:row._id}})
      },
      handleDelete(index, row) {
        // row 为当前整条数据
        console.log(index, row);
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
      getList(){
        this.$store.dispatch('data/getList').then(() => {
          this.tableData = this.dataList.result
        })        
      }
  },
  components:{
      pageFrame
  },
  computed:mapState({
      dataList: state => state.data.dataList,
      deleteResult: state => state.data.deleteResult
  }),
  mounted() {
    this.getList()
    console.log(equipmentInfo.getBrowserInfo())
  }
};
</script>

<style scoped>
</style>
