<style>
    .title{line-height: 60px;}
</style>

<template>
    <div>
        <h3 class="title">页面配置</h3>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="基本配置" name="first">
                <div>
                    <p>页面标题</p>
                    <el-input v-model="wholePage.title" placeholder=""></el-input>  
                    <p>页面背景</p>
                    <colorpicker></colorpicker>
                </div>                 
            </el-tab-pane>
            <el-tab-pane label="内容配置" name="second">
                <div v-for="item in activiyItem">
                    <div v-if="item.label === 'input'">   
                        <p>{{item.describe}}</p>
                        <el-input v-model="item.labelValue" placeholder=""></el-input>    
                    </div>
                    <div v-if="item.label === 'inputMore'"  v-for='(ele,index) in item.inputData'>
                        <p>{{ele.describe}}</p>
                        <el-input v-model="ele.labelValue" placeholder=""></el-input>                       
                    </div>
                </div>   
            </el-tab-pane>
            <el-tab-pane label="图片上传" name="pic">
                <div>
                    图片上传
                </div>                 
            </el-tab-pane>
        </el-tabs>


    </div>
</template>

<script>
import colorpicker from './colorpicker.vue'
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    props:['activiyItem','wholePage'],
    methods: {
        handleClick(tab, event){
            console.log(tab, event);
        }
    },
    components:{
        colorpicker
    }
  }
</script>