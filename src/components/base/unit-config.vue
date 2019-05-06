<style scoped>
    .title{line-height: 60px;}
    .styleBox{padding: 0 15px;}
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
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="数据更新" name="1">
                        <div v-for="item in activiyItem.advanceFields">
                            <!-- 一级配置 -->
                            <div v-if="item.label === 'input'">   
                                <p>{{item.describe}}</p>
                                <el-input v-model="item.labelValue" placeholder=""></el-input>    
                            </div>
                            <!-- 二级配置 -->
                            <div v-if="item.label === 'inputMore'"  v-for='(ele,index) in item.inputData'>
                                <p>{{ele.describe}}</p>
                                <el-input v-model="ele.labelValue" placeholder=""></el-input>                       
                            </div>
                        </div> 
                    </el-collapse-item>
                    <el-collapse-item title="设置样式" name="2">
                    <!-- 样式配置 -->
                        <div class="styleBox" v-for="(val,key,index) in activiyItem.style"  v-if="characters[key]">
                            <p>{{characters[key]}}</p>
                            <!-- <el-input v-model="activiyItem.style[key]" placeholder=""></el-input>   -->
                            <div class="block">
                                <el-slider
                                v-model="activiyItem.style[key]"
                                max=1000
                                show-input>
                                </el-slider>
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="设置事件" name="3">
                        <div>简化流程：设计简洁直观的操作流程；</div>
                        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
                    </el-collapse-item>
                </el-collapse>  
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
        activeName: 'first',
        characters:{
            'width':'宽度',
            'height':'高度',
            // 'background':'背景颜色',
            'font-size':'字体大小',
            'line-height':'行高',
            'border-radius':'圆角',
            'left':'距离左边',
            'top':'距离右边'
        },
        activeNames: ['1']
      };
    },
    props:['activiyItem','wholePage'],
    methods: {
        handleClick(tab, event){
            // console.log(tab, event);
        },
        handleChange(val) {
            // console.log(val);
        }
    },
    computed:{

    },
    components:{
        colorpicker
    },
    mounted () {
        // console.log('sh3456789')
        // console.log(this.activiyItem)
    }
  }
</script>