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
      :default-active='pagename'
      router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="list">
          <i class="el-icon-location"></i>
          <span>web专题</span>
      </el-menu-item>
      <el-menu-item index="template">
        <i class="el-icon-menu"></i>
        <span slot="title">app专题</span>
      </el-menu-item>
      <el-menu-item index="template" >
        <i class="el-icon-document"></i>
        <span slot="title">模板专题</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
    </el-menu>
  </el-col>

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

    };
  },
  props:['pagename'],
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
      
  },
  mounted() {
    console.log(this.pagename)
  }
};
</script>

<style scoped>
</style>
