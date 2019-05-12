<style scoped>
ul>li{width: 33.3%;float: left;min-height: 1000px;padding: 10px;box-sizing: border-box;border:1px solid #8e8e8e}
.comBox{position: relative;}
.center{text-align: center}
.pageClass{position: relative;width: 100%;min-height: 100px;}
.pageClass:hover{border: 1px solid red;opacity: 0.8}
.pageClass:hover .delate{display: block;}
.delate{width: 30px;height: 30px;position: absolute;top: 0;right: 0;color: #fff;background:blue;display:none;cursor: pointer;}
.magic:hover{}
/* .children{position: absolute;top: 0;left: 0;} */
</style>
<template>
    <div>
        <ul>
            <li>
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="组件库" name="1">
                        <!-- <h3 class="title">组件库</h3> -->
                        <draggable 
                            :list="listData"  
                            @update="datadragEnd" 
                            :options = "{animation:500}" 
            
                            :clone="cloneDog"
                            :group="{ name: 'people', pull: 'clone', put: false }"
                            >
                            <div v-for="item in listData"  class = "drag-item comBox">
                                <p class="center">{{item.baseName}}</p>
                                <component  v-bind:is="item.name" :itemData='item' :source='"default"'></component>
                            </div>        
                        </draggable>  
                    </el-collapse-item>
                    <el-collapse-item title=" UI模板库" name="2">
                        <div>简化流程：设计简洁直观的操作流程；</div>
                        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>åå 
                    </el-collapse-item>
                    <el-collapse-item title="动效库" name="3">
                        <style-config></style-config>
                    </el-collapse-item>
                </el-collapse>             
            </li>
            <li>
                <h3 class="title">页面预览</h3>
                <draggable 
                    :list="pageList"  
                    @update="datadragEnd" 
                    :options = "{animation:500}" 
                    group="people"
                    >
                    <div  v-for="item,index in pageList" @click.prevent.stop="clickItem(item,index)" class="pageClass father" :key="index">
                        <div class="delate" @click="deleteItem(index)">{{index}}</div>
                        <component  v-bind:is="item.name" :itemData='item'></component>
                        <!-- <div> -->
                            <component v-for="ele,num in item.children" @click.prevent.stop="clickItem(ele,num)" class="children"  v-bind:is="ele.name" :itemData='ele' key='index'></component>
                        <!-- </div> -->
                    </div>        
                </draggable>  
                <el-button @click="preview">预览</el-button>  
            </li>
            <li>
                <unit-config :activiyItem=activiyItem :wholePage=wholePage></unit-config>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>
<script>
// import $ from 'jquery'
import draggable from 'vuedraggable'
import api from './../../mock/componentsList'
import divimg from './../base/divimg'
import swiper from './../base/swiper'
import videoplay from './../base/videoplay'
import fixbottom from './../base/fixbottom'
import fixright from './../base/fixright'
import messagebox from '../base/messagebox'
import submit from './../base/submit'
import btn from './../base/btn'
import unitConfig from './../base/unit-config'
import styleConfig from './../base/style-config'
import componentsList from './../components-list'


import {
    mapState
} from 'vuex'
import axios from 'axios'
    export default {
        data(){
            return{
                listData: [], // 全部组件
                pageList:[], // 当前选中组件
                activiyItem:{},
                activiyIndex:-1,
                wholePage:'',
                activeNames: ['1'],
                list: [
                    {
                    name: "task 1",
                    tasks: [
                        {
                        name: "task 2",
                        tasks: []
                        }
                    ]
                    },
                    {
                    name: "task 3",
                    tasks: [
                        {
                        name: "task 4",
                        tasks: []
                        }
                    ]
                    },
                    {
                    name: "task 5",
                    tasks: []
                    }
                ]
            }
        },
        methods:{
            getdata (evt) {
                console.log(evt.draggedContext.element)
            },
            datadragEnd (evt) {
                evt.preventDefault();
                // console.log('拖动前的索引 :' + evt.oldIndex)
                // console.log('拖动后的索引 :' + evt.newIndex)
                console.log(this.pageList);
            },
            cloneDog(id ) {
                let data = this.deepClode(id)
                console.log(data)
                this.pageList.push(data)
                // return id
            },
            clickItem(item,index){
                // console.log(this.pageList[index])
                this.activiyItem = item
                this.activiyIndex = index
            },
            deleteItem(index){
                this.pageList.splice(index, 1);
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
                this.$router.push({name:'preview'})
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
        // computed:mapState({
        //     stylelist: state => state.compontentList.stylelist
        // }),
        mounted () {
	        //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            axios.get('/user/userInfo', {
                params: {
                    
                }
            })
            .then((response) => {
                let da = response.data
                this.listData = da.data
                this.wholePage = da.whole
                document.title = this.wholePage.title
            })
            .catch((error) => {
                console.log(error);
            });
    
        },
        components:{
            draggable,
            divimg,
            swiper,
            videoplay,
            fixbottom,
            fixright,
            componentsList,
            submit,
            messagebox,
            unitConfig,
            styleConfig,
            btn
        }
    }
</script>