<style scoped>
    .title{line-height: 60px;}
    .styleBox{padding: 0 15px;}
    .styleBox >>>.el-color-picker{width:100%;height: 20px;}
    .styleBox >>>.el-color-picker__trigger{width:100%;height: 20px;}
    .disableSee{
        width: 90px;
        height: 100%;
        background: red;
        display: block;
        position: absolute;
        top: 0px;
        left: 0px;
        opacity: 0;
    }
    .uploadButton{
        width: 50px;
        /* position: relative; */
    }
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
                        <div v-for="item,index in activiyItem.advanceFields">

                            <div v-if="item.label === 'divimg'">
                                <p>{{item.describe}}</p>
                                <el-input v-model="item.labelValue" placeholder="">
                                    
                                    <div slot="prepend" class="uploadButton">
                                        <p>选择图片</p>
                                        <input type="file" name="files" @click="upload($event,item,index)" class="disableSee" >
                                    </div>
                                </el-input>                                   
                            </div>
                            <!-- 一级配置 -->
                            <div v-if="item.label === 'input'">   
                                <p>{{item.describe}}</p>
                                <el-input v-model="item.labelValue" placeholder="">
                                </el-input>    
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
                            <div v-if="key !== 'color' && key !== 'background'" class="block">
                                <el-slider
                                v-model="activiyItem.style[key]"
                                max=1000
                                show-input>
                                </el-slider>
                            </div>
                            <div v-if="key === 'color' || key === 'background'">
                                <el-color-picker v-model="activiyItem.style[key]" show-alpha></el-color-picker>
                            </div>
                        </div>
                    </el-collapse-item>
                    <el-collapse-item title="设置" name="3">
                        <div  v-if="activiyItem && activiyItem.advanceFields">
                            <p>添加二级组件</p>
                                <el-select v-model="value" clearable placeholder="请选择">
                                    <el-option
                                    v-for="item in comlist"
                                    :key="item.name"
                                    :label="item.baseName"
                                    :value="item.name">
                                    </el-option>
                                </el-select>                            
                        </div>

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
import {
    mapState
} from 'vuex'
import colorpicker from './colorpicker.vue'
  export default {
    data() {
      return {
        activeName: 'first',
        characters:{
            'width':'宽度',
            'height':'高度',
            'background':'背景颜色',
            'font-size':'字体大小',
            'line-height':'行高',
            'border-radius':'圆角',
            'left':'距离左边',
            'top':'距离右边',
            'color':'字体颜色'
        },
        activeNames: ['1'],
        value: ''
      };
    },
    props:['activiyItem','wholePage'],
    watch:{
        value(val){
            let arr = this.comlist.filter((element, index, self) => {
                if(element['name']===val){
                    return element
                }            
            })
            console.log(arr[0])
            this.activiyItem.children.push(arr[0])
        }
    },
    methods: {
        handleClick(tab, event){
            // console.log(tab, event);
        },
        handleChange(val) {
            // console.log(val);
        },
        // changeOption(item){
        //     this.activiyItem.children.push(item)
        //     console.log(this.activiyItem)
        // },
        upload(e,item,index){
            var self = this;
            var xhr, formData;
            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', 'https://up0.z3quant.com/z3upload/api/upload/multi');
            xhr.setRequestHeader('enctype','multipart/form-data');
            xhr.onload = function() {
            var json;
            if (xhr.status !== 200) {
                alert('HTTP Error: ' + xhr.status);
                return;
            }
            json = JSON.parse(xhr.responseText);
            if (!json || typeof json.files[0].uri !== 'string') {
                alert('Invalid JSON: ' + xhr.responseText);
                return;
            }
                console.log(json.files[0].uri)
                item.labelValue = json.files[0].uri
            };
            formData = new FormData();
            formData.append('org', 'dfzq');
            // formData.append('files', blobInfo.filename());
            // console.log(e.target.files[0].name)
            formData.append('files', e.target.files[0], e.target.files[0].name);
            xhr.send(formData);            // console.log(e.target.files
        }
    },
    computed:mapState({
        comlist: state => state.compontentList.comlist
    }),
    components:{
        colorpicker
    },
    mounted () {
        this.$store.dispatch('compontentList/getCompontentList')
    }
  }
</script>