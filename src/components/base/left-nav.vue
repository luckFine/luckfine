<style scoped>
.navBox{
    width: 170px;
    height: 100%;
    position: fixed;
    background-color: rgb(84, 92, 100)
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
<div class="navBox">
  <el-col :span="20">
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="1">
        <!-- <template slot="title"> -->
          <i class="el-icon-location"></i>
          <span>web专题</span>
        <!-- </template> -->
        <!-- <el-menu-item-group>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu> -->
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">app专题</span>
      </el-menu-item>
      <el-menu-item index="3" >
        <i class="el-icon-document"></i>
        <span slot="title">模板专题</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
    </el-menu>
  </el-col>
    <div class="content">
      <div>
        <template>
          <el-table
            :data="tableData"
            style="width: 100%"
            :default-sort = "{prop: 'date', order: 'descending'}"
            >
            <!-- <el-table-column
              prop="time"
              label="创建时间"
              sortable
              width="180">
            </el-table-column> -->
            <el-table-column
              prop="creator"
              label="创建者"
              sortable
              width="180">
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row,)">编辑</el-button>
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
</div>
</template>

<script>
import {
    mapState
} from 'vuex'
import axios from 'axios'
export default {
  name: 'login.vue',
  data() {
    return {
      tableData:'' 
    };
  },
  computed:mapState({
      dataList: state => state.data.dataList
  }),
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      addlist(){
        this.$router.push({name:'/'})
      },
      handleSelect(key, keyPath) {
        switch (key) 
        {
          case "1":
          this.getData('webData')
        }
      },
      handleEdit(index, row){
        this.$router.push({name:'/',params:{id:row._id}})
      },
      handleDelete(index, row) {
        // row 为当前整条数据
        console.log(index, row);
      }
  },
  mounted() {
    this.$store.dispatch('data/getList').then(() => {
      this.tableData = this.dataList.result
      console.log(this.tableData)
    })
  }
};
</script>

<style scoped>
</style>
