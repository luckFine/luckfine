<style scoped>
ul>li{width: 33.3%;float: left;min-height: 1000px;padding: 10px;box-sizing: border-box;border:1px solid #8e8e8e}
.iphone{width: 300px;height: 600px; background: url('../../assets/img/iphone.png') center 0 no-repeat;background-size: 100%;margin: 0 auto;margin-top: 10px;overflow: hidden;}
.iphoneContent{width: 256px;height: 554px;background: blue;margin: 0 auto; margin-top:18px; overflow: scroll}
.comBox{position: relative;}
.center{text-align: center}
.pageClass{position: relative;}
.pageClass:hover{border: 1px solid red;opacity: 0.8}
.pageClass:hover .delate{display: block;}
.delate{width: 30px;height: 30px;position: absolute;top: 0;right: 0;color: #fff;background:blue;display:none;cursor: pointer; }
</style>
<template>
    <div>
        <ul>
            <li>
                <h3 class="title">组件库</h3>
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
                <h3 class="title">页面预览</h3>
                <div class="iphone">
                    <div class="iphoneContent">
                        <draggable 
                            :list="pageList"  
                            @update="datadragEnd" 
                            :options = "{animation:500}" 
                            group="people"
                            >
                            <div v-for="item,index in pageList" @click.prevent="clickItem(item.advanceFields,index)" class="pageClass">
                                <div class="delate" @click="deleteItem(index)">X</div>
                                <component  v-bind:is="item.name" :advanceFields='item.advanceFields' v-model="item.advanceFields"></component>
                            </div>        
                        </draggable>     
                    </div>
                </div>
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
import $ from 'jquery'
import draggable from 'vuedraggable'
import api from './../../mock/componentsList'
import divimg from './../base/divimg'
import swiper from './../base/swiper'
import videoplay from './../base/videoplay'
import fixbottom from './../base/fixbottom'
import fixright from './../base/fixright'
import messagebox from '../base/messagebox'
import submit from './../base/submit'
import unitConfig from './../base/unit-config'
import componentsList from './../components-list'
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
            cloneDog(id ) {
                let data = this.deepClode(id)
                this.pageList.push(data)
                // return id
            },
            clickItem(item,index){
                this.activiyItem = item
                this.activiyIndex = index
            },
            deleteItem(index){
                console.log('触发删除事件')
                if(this.activiyIndex !== -1){
                    this.pageList.splice(index, 1);
                }
                // console.log(this.pageList)
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
            videoplay,
            fixbottom,
            fixright,
            componentsList,
            submit,
            messagebox,
            unitConfig
        }
    }
</script>