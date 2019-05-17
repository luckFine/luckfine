<style scoped>
/* ul>li{width: 33.3%;float: left;min-height: 1000px;padding: 10px;box-sizing: border-box;border:1px solid #8e8e8e} */
.comBox{position: relative;}
.center{text-align: center}
.pageClass{position: relative;width: 100%;min-height: 100px;}
.pageClass:hover,.childClass:hover{border: 1px solid red;opacity: 0.8}
.pageClass:hover .delate,.childClass:hover .delate{display: block;}
.delate{width: 30px;height: 30px;position: absolute;top: 0;right: 0;color: #fff;background:blue;display:none;cursor: pointer;}
.magic:hover{}
.children{}
.childClass{position: absolute;top: 0;left: 0;white-space:nowrap}
/* 左侧导航 */
.tabBar{width:100px;height: 100%; position: fixed;left: 0;top: 0;background: #e6e6e6;color:rgb(84, 92, 100);z-index: 10;background: #fff;}
.tabBarContent{width: 300px;position: fixed;top: 0;z-index: 9;transition:left -200px 1s}
.rightBar{width:350px;position: fixed;right: 0;top: 0;}
.activityBar{left: 100px;}
</style>
<template>
    <div>
        <ul class="tabBar">
            <li @click="activity('1')">
                <i class="el-icon-location"></i>
                <span slot="title">导航一</span>                    
            </li>
            <li @click="activity('2')" :class="{'activityBar':activityBar === '2'}">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>                    
            </li>
            <li @click="activity('3')" :class="{'activityBar':activityBar === '3'}">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
            </li>
        </ul>
        <div class="tabBarContent" :class="{'activityBar':activityBar === '1'}">
            <div>
                <draggable 
                    v-model="listData"  
                    class="dragArea list-group"
                    :clone="cloneDog"
                    :group="{ name: 'people', pull: 'clone', put: false }"
                    >
                    <div v-for="item,index in listData"  class = "drag-item comBox list-group-item" :key="index">
                        <p class="center">{{item.baseName}}</p>
                        <component  v-bind:is="item.name" :itemData='item' :source='"default"'></component>
                    </div>        
                </draggable>  
            </div>
            <div>
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>åå                 
            </div>
            <div>
                <style-config></style-config>
            </div>
        </div>
        <div>
            <draggable 
                class="dragArea list-group"
                v-model="pageList"  
                group="people"
                >
                <div  v-for="item,index in pageList" @click.prevent.stop="clickItem(item,index)" class="list-group-item pageClass father" :key="index">
                    <div class="delate" @click="deleteItem(index)">{{index}}</div>
                    <component  v-bind:is="item.name" :itemData='item'></component>
                    <div class="childClass" 
                        v-if="item.children.length>0" 
                        v-for="ele,num in item.children" 
                        @click.prevent.stop="clickItem(ele,num)" 
                        :style="StyleSheet" >
                        <div class="delate" @click="deleteClilden(item,num)">{{index}}</div>
                        <component class="children"  v-bind:is="ele.name" :itemData='ele' key='index'></component>
                    </div>
                </div>        
            </draggable>  
        </div>
        <div class="rightBar">
            <unit-config :activiyItem=activiyItem :wholePage=wholePage></unit-config>
        </div>
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
                activityBar:''
            }
        },
        methods:{
            getdata (evt) {
                console.log(evt.draggedContext.element)
            },
            activity(num){
                this.activityBar = num
            },
            datadragEnd (evt) {
                console.log(this.pageList);
            },
            cloneDog(id ) {
                let data = this.deepClode(id)
                // this.pageList.push(data)
                return data
            },
            clickItem(item,index){
                // console.log(this.pageList[index])
                this.activiyItem = item
                this.activiyIndex = index
            },
            deleteItem(index){    
                this.pageList.splice(index, 1);
            },
            deleteClilden(item,num){
                console.log(item)
                item.children.splice(num, 1);
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
                let goRouter = this.$router.resolve({name:'preview'})
                window.open(goRouter.href, '_blank');

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
        computed:{
            StyleSheet(){
                let obj = this.deepClode(this.activiyItem.style)
                Object.keys(obj).forEach((key) => {
                    if( typeof(obj[key]) == 'number'){
                        let str = obj[key].toString()
                        obj[key] = str+'%'
                    }
                })
                return obj                
            }
        },
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