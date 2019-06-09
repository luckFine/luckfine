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
    div >>>.el-tabs__content{
        height: 600px;
        overflow-y: scroll;
    }
    .tabValue li{
        float: left;
    }
    .tabValue li:first-child{
        width: 30%;
    }
    .tabValue li:first-child +li{
        width: 70%;
    }
</style>

<template>
    <div>
        <!-- <h3 class="title">页面配置</h3> -->
        <el-tabs id="rightTab" v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="基本配置" name="first">
                <div>
                    <p>页面标题</p>
                    <el-input v-model="wholePage.title" placeholder=""></el-input>  
                    <p>创建者</p>
                    <el-input v-model="wholePage.creater" placeholder=""></el-input>  
                    <p>活动时间</p>
                    <div class="block">
                        <el-date-picker
                        v-model="wholePage.section"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div>
                </div>                 
            </el-tab-pane>
            <el-tab-pane label="内容配置" name="second">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="数据更新" name="1">
                        <div v-for="item,index in activiyItem.advanceFields">

                            <div v-if="activiyItem.name !== 'tabs'">
                                <div v-if="item.label === 'divimg'">
                                    <p>{{item.describe}}</p>
                                    <el-input v-model="item.labelValue" placeholder="">
                                        <div slot="prepend" class="uploadButton">
                                            <p>输入图片地址</p>
                                        </div>
                                    </el-input>   
                                    <div slot="prepend" class="uploadButton">
                                        <el-upload
                                            class="upload-demo"
                                            enctype="multipart/form-data"
                                            name='files'
                                            action="https://up0.z3quant.com/z3upload/api/upload/multi"
                                            :headers='headers'
                                            :data='upLoadData'
                                            :show-file-list='false'
                                            multiple
                                            :on-success="success"
                                            >
                                            <el-button size="small" type="primary">选择图片</el-button>
                                        </el-upload>
                                    </div>                             
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

                            <div v-if="activiyItem.name === 'tabs'">
                                <div v-if="item.label === 'input'">   
                                    <p>{{item.describe}}</p>
                                    <el-input v-model="item.labelValue" placeholder="">
                                    </el-input>  
                                    <ul>
                                        <li>
                                            <el-input  placeholder="" >
                                                <div slot="prepend" class="uploadButton">
                                                    <p>tab背景</p>
                                                </div>
                                            </el-input>
                                        </li>
                                        <li>
                                            <el-input v-model="item.actBg" placeholder="">
                                                <div slot="prepend" class="uploadButton">
                                                    <p>tab地址</p>
                                                </div>
                                            </el-input>
                                        </li>
                                    </ul> 
                                </div>

                                <ul class="tabValue clearfix" v-if="item.label === 'inputMore'" v-for='(ele,index) in item.inputData'>
                                    <li><el-input v-model="ele.tabName" placeholder="" ></el-input></li>
                                    <li><el-input v-model="ele.imgSrc" placeholder=""></el-input></li>
                                </ul> 
                            </div>
                            <!-- 点击跳转 -->
                            <div v-if="activiyItem.clickEventHref && !activiyItem.isBuy.isBuy">
                                <p>{{activiyItem.clickEventHref.describe}}</p>
                                <el-input v-model="activiyItem.clickEventHref.href" placeholder="">
                                </el-input>    
                            </div>

                            <div v-if="activiyItem.addclass && activiyItem.addclass.open">
                                <p>添加动效</p>
                                <el-select v-model="classValue" clearable placeholder="请选择">
                                    <el-option
                                    v-for="(item) in stylelist"
                                    :key="item.classname"
                                    :label="item.classname"
                                    :value="item.classname">
                                    </el-option>
                                </el-select>  
                            </div>
                            <!-- 点击购买 -->
                            <div v-if="activiyItem.name === 'btn'">
                                <p>是否是购买</p>
                                <el-switch
                                    v-model="activiyItem.isBuy && activiyItem.isBuy.isBuy"
                                    active-text="是"
                                    inactive-text="否">
                                </el-switch>
                                <div v-if="activiyItem.isBuy && activiyItem.isBuy.isBuy">
                                    <el-input v-model="activiyItem.isBuy.productSubId" placeholder="">
                                        <div slot="prepend" class="uploadButton">
                                            <p>产品类型</p>
                                        </div>
                                    </el-input>  
                                    <el-input v-model="activiyItem.isBuy.productId" placeholder="">
                                        <div slot="prepend" class="uploadButton">
                                            <p>产品id</p>
                                        </div>
                                    </el-input>
                                    <el-input v-model="activiyItem.isBuy.type" placeholder="">
                                        <div slot="prepend" class="uploadButton">
                                            <p>产品周期</p>
                                        </div>
                                    </el-input>
                                    <el-input v-model="activiyItem.isBuy.href" placeholder="">
                                        <div slot="prepend" class="uploadButton">
                                            <p>成功连接</p>
                                        </div>
                                    </el-input> 
                                </div>
                            </div>
                        </div> 
                    </el-collapse-item>
                    <el-collapse-item title="设置样式" name="2">
                    <!-- 样式配置 -->
                        <div class="styleBox" v-for="(val,key,index) in activiyItem.style"  v-if="characters[key]"> 
                            <p>{{characters[key]}}</p>
                            <!-- <el-input v-model="activiyItem.style[key]" placeholder=""></el-input>   -->
                            <div v-if="key !== 'color' && key !== 'background-color' && key !== 'background'" class="block">
                                <el-slider
                                v-model="activiyItem.style[key]"
                                max=5000
                                show-input>
                                </el-slider>
                            </div>
                            <div v-if="key === 'color' || key === 'background-color'">
                                <el-color-picker v-model="activiyItem.style[key]" show-alpha></el-color-picker>
                            </div>
                            <div v-if="key === 'background'">
                                <el-input v-model="activiyItem.style[key]" placeholder=""></el-input>   
                            </div>
                        </div>
                        <!-- 提交信息的弹窗 -->
                        <div v-if="activiyItem.name === 'submit'">
                            <div> 
                                <el-input v-model="activiyItem.styleBg.background" placeholder="">
                                    <div slot="prepend" class="uploadButton">
                                        <p>弹窗背景</p>
                                    </div>
                                </el-input>  
                                <el-input v-model="activiyItem.styleSuc.background" placeholder="">
                                    <div slot="prepend" class="uploadButton">
                                        <p>成功背景</p>
                                    </div>
                                </el-input>  
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
            <!-- <el-tab-pane label="图片上传" name="pic">
                <div>
                    图片上传
                </div>                 
            </el-tab-pane> -->
        </el-tabs>
    </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import colorpicker from './colorpicker.vue'
import { setTimeout } from 'timers';
  export default {
    data() {
      return {
        activeName: 'first',
        characters:{
            'width':'宽度',
            'height':'高度',
            'background-color':'背景颜色',
            'background':'背景图片',
            'font-size':'字体大小',
            'line-height':'行高',
            'border-radius':'圆角',
            'left':'距离左边',
            'top':'距离上方',
            'color':'字体颜色'
        },
        headers:{
            'enctype':'multipart/form-data'
        },
        activeNames: ['1'],
        value: '',
        piclist:[],
        upLoadData:{
          org:'jrjact',
          files:''
        },
        morePicArr:[],
        classValue:'',
        loop:''
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
            this.activiyItem.children.push(arr[0])
        },
        classValue(val){
            this.activiyItem.addclass.classname = val
        },
        morePicArr:{
            handler(val){
                this.$emit('input',val)
            }
        },
        wholePage:{
            handler(val){
                document.title = this.wholePage.title
                document.body.style.background = this.wholePage.backgroud;
            },
            deep:true
        }
    },
    methods: {
        handleClick(tab, event){
            event.preventDefault();
            event.stopPropagation();
        },
        handleChange(val) {
            // console.log(val);
        },
        bgcolor(data){
            this.wholePage.backgroud = data
        },
        success(response, file, fileList){
            if(fileList.length>1){

                this.morePicArr = file.response.files[0].uri
                // fileList.
                // for(let a = 0; a<fileList.length; a++){
                //     fileList[name]
                // }
                console.log(fileList.length)
                // console.log(fileList.)
                console.log(fileList)
                console.log(this.morePicArr)
                // this.$store.commit('data/setMorePicArr',this.morePicArr)               
            }
        }
    },
    computed:mapState({
        comlist: state => state.compontentList.comlist,
        morePicArr: state => state.data.morePicArr,
        stylelist: state => state.compontentList.stylelist
    }),
    components:{
        colorpicker
    },
    mounted () {
        this.$store.dispatch('compontentList/getCompontentList')
        this.$store.dispatch('compontentList/getStyleList')
    }
  }
</script>