<style scoped>
ul>li{width: 33.3%;float: left;height: 500px;padding: 10px;box-sizing: border-box;}
.comBox{position: relative;}
.center{text-align: center}
</style>
<template>
    <div>
        <ul>
            <li>
                <draggable 
                    :list="listData"  
                    @update="datadragEnd" 
                    :options = "{animation:500}" 
    
                    :clone="cloneDog"
                    :group="{ name: 'people', pull: 'clone', put: false }"
                    >
                    <div v-for="item in listData"  class = "drag-item comBox">
                        <p class="center">{{item.baseName}}</p>
                        <component  v-bind:is="item.name" :advanceFields='item.advanceFields' :source='"default"'></component>
                    </div>        
                </draggable>                
            </li>
            <li>
                <draggable 
                    :list="pageList"  
                    @update="datadragEnd" 
                    :options = "{animation:500}" 
                    group="people"
        
                    >
                    <div v-for="item,index in pageList" @click="clickItem(item.advanceFields,index)">
                        <component  v-bind:is="item.name" :advanceFields='item.advanceFields' v-model="item.advanceFields"></component>
                    </div>        
                </draggable>  
                <el-button @click="preview">预览</el-button>  
            </li>
            <li>
                <div>
                    <p>页面标题</p>
                    <el-input v-model="wholePage.title" placeholder=""></el-input>  
                    <p>页面背景</p>
                    <colorpicker></colorpicker>
                </div>
                <div v-for="item in activiyItem">
                    <div v-if="item.label === 'input'">   
                        <p>{{item.describe}}</p>
                        <el-input v-model="item.labelValue" placeholder=""></el-input>    
                    </div>s
                    <div v-if="item.label === 'inputMore'"  v-for='(ele,index) in item.inputData'>
                        <p>{{ele.describe}}</p>
                        <div>{{ele.labelValue}}</div>
                        <el-input v-model="ele.labelValue" placeholder=""></el-input>                       
                    </div>
                </div>
                <el-button @click="deleteItem()">删除</el-button>  
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
import $ from 'jquery'
import draggable from 'vuedraggable'
import api from './../mock/componentsList'
import divimg from './base/divimg'
import swiper from './base/swiper'
import videoplay from './base/videoplay'
import colorpicker from './base/colorpicker'
import fixbottom from './base/fixbottom'
import fixright from './base/fixright'
import messagebox from './base/messagebox'
import submit from './base/submit'
import componentsList from './components-list'
import {
    mapState
} from 'vuex'

    export default {
        data(){
            return{
                listData: [], // 全部组件
                pageList:[], // 当前选中组件
                activiyItem:[],
                activiyIndex:-1,
                wholePage:''
            }
        },
        methods:{
            getdata (evt) {
                console.log(evt.draggedContext.element)
            },
            datadragEnd (evt) {
                evt.preventDefault();
                console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)
                // console.log(this.colors);
            },
            // log: function(evt) {
            //     window.console.log(evt);
            // },
            cloneDog(id ) {
                let data = this.deepClode(id)
                this.pageList.push(data)
                // return id
            },
            clickItem(item,index){
                this.activiyItem = item
                this.activiyIndex = index
            },
            deleteItem(){
                console.log(this.activiyIndex)
                if(this.activiyIndex !== -1){
                    this.pageList.splice(this.activiyIndex, 1);
                }
                console.log(this.pageList)
            },
            deepClode(obj){
                let objClone = Array.isArray(obj)?[]:{};
                let key
                if(obj && typeof obj==='object'){
                    for(key in obj){
                        if(obj.hasOwnProperty(key)){
                            //判断ojb子元素是否为对象，如果是，递归复制
                            if(obj[key]&&typeof obj[key] ==='object'){
                                objClone[key] = this.deepClode(obj[key]);
                            }else{
                                //如果不是，简单复制
                                objClone[key] = obj[key];
                            }
                        }
                    }
                }
                return objClone;
            },
            preview(){
                // 保存当前pageList
                localStorage.setItem('pageList',JSON.stringify(this.pageList))
                this.$router.push({name:'Foo'})
            }
        },
        watch:{
            pageList:{
                handler(){
                    // console.log(this.pageList)
                },
                deep:true
            }
        },
        mounted () {
	        //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            var self = this;
            $.ajax({
                url: '/user/userInfo',
                success:function(data){
                    let da = JSON.parse(data)
                    self.listData = da.data
                    self.wholePage = da.whole
                    document.title = self.wholePage.title

                }
            })
            // console.log(deepClode)
        },
        components:{
            draggable,
            divimg,
            swiper,
            colorpicker,
            videoplay,
            fixbottom,
            fixright,
            componentsList,
            submit,
            messagebox
        },
    }
</script>