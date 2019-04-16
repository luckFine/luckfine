<style scoped>
ul>li{width: 33.3%;float: left;height: 500px;padding: 10px;box-sizing: border-box;}
</style>
<template>
    <div>
        <ul>
            <li>
                <draggable v-model="listData"  
                    @update="datadragEnd" 
                    :options = "{animation:500}" 
                    @change="log"
                    :clone="cloneDog"
                    :group="{ name: 'people', pull: 'clone', put: false }"
                    >
                    <div v-for="item in listData"  class = "drag-item">
                        <component  v-bind:is="item.name" :advanceFields='item.advanceFields'></component>
                    </div>        
                </draggable>                
            </li>
            <li>
                <draggable 
                    v-model="pageList"  
                    @update="datadragEnd" 
                    :options = "{animation:500}" 
                    group="people"
                    @change="log"
                    >
                    <div v-for="item in pageList" @click="clickItem(item.advanceFields)">
                        <component  v-bind:is="item.name" :advanceFields='item.advanceFields'></component>
                    </div>        
                </draggable>  
                <el-button @click="preview">预览</el-button>  
            </li>
            <li>
                <div v-for="item in activiyItem">
                    <p>{{item.label}}</p>
                    <el-input v-model="item.labelValue" placeholder=""></el-input>
                </div>
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
import componentsList from './components-list'
import {
    mapState
} from 'vuex'

    export default {
        data(){
            return{
                listData: [], // 全部组件
                pageList:[], // 当前选中组件
                activiyItem:[]
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
            log: function(evt) {
                window.console.log(evt);
            },
            cloneDog(id ) {
                let data = this.deepClode(id)
                this.pageList.push(data)
                // return id
            },
            clickItem(item){
                this.activiyItem = item
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
                    console.log(this.pageList)
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

                }
            })
            // console.log(deepClode)
        },
        components:{
            draggable,
            divimg,
            swiper,
            componentsList
        },
    }
</script>