<style scoped>
/* .viewBox{width: 100%;min-height:800px;} */
.comBox{position: relative;}
.center{text-align: center}
.pageClass{position: relative;width: 100%;}
.pageClass:hover,.childClass:hover{border: 1px solid red;opacity: 0.8}
.pageClass:hover .delate,.childClass:hover .delate{display: block;}
.delate{width: 30px;height: 30px;position: absolute;top: 0;right: 0;color: #fff;background:blue;display:none;cursor: pointer;z-index: 5}
.childClass{position: absolute;top: 0;left: 0;white-space:nowrap}
.bottomBox{width:100%;height:60px;position: fixed;left: 0;bottom: 0;z-index: 20;}
/* 左侧导航 */
.tabBar{width:80px;height: 100%; position: fixed;left: 0;top: 0;background: #e6e6e6;color:rgb(84, 92, 100);z-index: 10;background: #fff;padding-top: 50px;box-sizing: border-box;}
.tabBar i{font-size: 1.5em;display: block;margin: 0 auto;padding: 10px;box-sizing: border-box;color:rgb(84, 92, 100);}
.tabBar p{text-align: center;}
.tabBarContent{width: 200px;position: fixed;top: 0;z-index: 9;left: -200px;background: #fff;box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);padding: 10px;box-sizing: border-box;height: 100%;overflow-y: scroll;}
.rightBar{width:350px;position: fixed;right: -350px;top: 10%;background: #fff;z-index: 10;}
.showRightBar{transition: right 0.7s;right: 0;}
.showRightBarFalse{transition: right 0.7s;right: -350px;}
.activityBar{transition: left 0.7s;left: 80px;}
.activityBarFalse{transition: left 0.7s;left: -200px;}
/* 主视图 */
.mainContent{width: 1100px;position: absolute;top: 0%;left: 50%;margin-left: -550px;height: 100%;}
</style>
<template>
    <div class="pageContent" id="pageContent">
        <ul class="tabBar">
            <!-- <li @click="cancel">
                <i class="el-icon-s-home"></i>
                <p slot="title">首页</p>                    
            </li> -->
            <li @click="activity('1')">
                <i class="el-icon-s-management"></i>
                <p slot="title">组件库</p>                    
            </li>
            <!-- <li @click="activity('2')" :class="{'activityBar':activityBar === '2'}">
                <i class="el-icon-s-order"></i>
                <p slot="title">模板库</p>                    
            </li> -->
            <li @click="activity('3')" :class="{'activityBar':activityBar === '3'}">
                <i class="el-icon-s-open"></i>
                <p slot="title">动效库</p>
            </li>
            <!-- <li @click="activity('3')" :class="{'activityBar':activityBar === '3'}">
                <i class="el-icon-s-data"></i>
                <p slot="title">数据分析</p>
            </li> -->
        </ul>
        <!-- <div> -->
            <div :class="[{'activityBar':activityBar === '1'},'tabBarContent']">
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
            <div  :class="[{'activityBar':activityBar === '2'},'tabBarContent']">
                <div>简化流程：设计简洁直观的操作流程；</div>
                <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
                <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>åå                 
            </div>
            <div  :class="[{'activityBar':activityBar === '3'},'tabBarContent']">
                <style-config></style-config>
            </div>
        <!-- </div> -->
        <div>
            <draggable 
                class="dragArea viewBox  list-group"
                v-model="pageList"  
                group="people"
                >
                <div  v-for="item,index in pageList" @click.prevent.stop="clickItem(item,index)" class="list-group-item pageClass father" :key="index">
                    <div class="delate" @click="deleteItem(index)">{{index}}</div>
                    <component  
                        v-bind:is="item.name" 
                        :itemData='item' 
                        :source='"visual"' 
                        :pageList=pageList
                        :fixed='index' 
                        >
                    </component>
                    <div class="mainContent">
                        <div 
                            :class="[childClass,classname(ele)]"  
                            v-if="item.children.length>0" 
                            v-for="ele,num in item.children" 
                            @click.prevent.stop="clickItem(ele,num)" 
                            :style="StyleSheet(ele)" >
                            <div class="delate" @click.prevent.stop="deleteClilden(item,num)">{{index}}</div>
                            <component class="children"  v-bind:is="ele.name" :itemData='ele' key='index'></component>
                        </div>
                    </div>
                </div>        
            </draggable>
        </div>
        <div class="bottomBox">
            <el-button @click="cancel">取消</el-button>  
            <el-button @click="preview">预览</el-button>  
            <el-button type="primary" @click="savePages">保存</el-button>
        </div>
        <div :class="['rightBar',{'showRightBar':showRightBar},{'showRightBarFalse':!showRightBar}]">
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
import tabs from './../base/tabs'
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
                wholePage:{
                    title:'',
                    backgroud:'#e6e6e6'
                },
                activityBar:'',
                showRightBar:false
            }
        },
        methods:{
            getdata (evt) {
                console.log(evt.draggedContext.element)
            },
            activity(num){
                this.activityBar === num ? this.activityBar = '' : this.activityBar = num
            },
            datadragEnd (evt) {
                console.log(this.pageList);
            },
            cloneDog(id ) {
                let data = this.deepClode(id)
                return data
            },
            cancel(){
               this.$router.push({name:'/list'}) 
            },
            receiveChild(index){
                this.pageList.splice(index, 1);
            },
            clickItem(item,index){
                this.activiyItem = item
                this.activiyIndex = index
                this.showRightBar = true
            },
            deleteItem(index){    
                this.pageList.splice(index, 1);
            },
            deleteClilden(item,num){
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

            },
            classname(ele){
                if(ele.addclass && ele.addclass.classname){
                    let name = ele.addclass.classname
                    let infinite = ele.addclass.loop === true ? 'infinite' : ''
                    return [name,infinite,'animated']                     
                }else{
                    return false
                }
               
            },
            savePages(){
                if(this.$route.params.id && this.$route.params.scene==='add'){
                    localStorage.setItem('pageList',JSON.stringify(this.pageList))
                    let str = this.pageList
                    let wholePage = this.wholePage
                    this.$store.dispatch('data/savePages',{
                        content:str,
                        wholePage:wholePage,
                    }).then(() => {
                        // 保存成功
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });

                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 1000);

                    })                    
                }else{
                    localStorage.setItem('pageList',JSON.stringify(this.pageList))
                    let str = this.pageList
                    let wholePage = this.wholePage
                    this.$store.dispatch('data/savePages',{
                        content:str,
                        wholePage:wholePage,
                        _id:this.$route.params.id
                    }).then(() => {
                        // 保存成功
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        });

                        setTimeout(() => {
                            this.$router.go(-1);
                        }, 1000);

                    })   
                }

            },
            StyleSheet(ele){
                let obj = this.deepClode(ele.style)
                Object.keys(obj).forEach((key) => {
                    if( typeof(obj[key]) == 'number'){
                        let str = obj[key].toString()
                        obj[key] = str+'px'
                    }
                })
                return obj                
            }
        },
        watch:{
            pageList:{
                handler(){
                    // console.log(this.pageList)
                },
                deep:true
            },
            morePicArr:{
                handler(){
                    let data = {
                        'name':'divimg',
                        'baseName':'静态部分',
                        'advanceFields':[
                            {
                            'label':'divimg',
                            'describe':'图片地址',
                            'labelValue':'' 
                        }
                        ],
                        'children':[]
                    }
                    data.advanceFields[0].labelValue = this.morePicArr
                    this.pageList.push(data)
                },
                deep:true
            }
        },
        computed:mapState({
            // StyleSheet(ele){
            //     let obj = this.deepClode(ele.style)
            //     Object.keys(obj).forEach((key) => {
            //         if( typeof(obj[key]) == 'number'){
            //             let str = obj[key].toString()
            //             obj[key] = str+'px'
            //         }
            //     })
            //     return obj                
            // },
            savePage: state => state.data.savePageResult,
            morePicArr: state => state.data.morePicArr,
            pageDetailData: state => state.data.pageDetailData
        }),
        mounted () {
            //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            if(this.$route.params.id){
                alert('编辑')
                this.$store.dispatch('data/pageDetail',{
                    id:this.$route.params.id
                }).then(() => {
                    if(this.pageDetailData.errCode === 0){
                        this.pageList = this.pageDetailData.result.content
                        this.wholePage = this.pageDetailData.result.wholePage
                    }
                })
            }else{
                alert('新建')
            }
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
            })
            .catch((error) => {
                console.log(error);
            });
            let element = document.getElementById('app')
            element.addEventListener("click",(event) => {
                if(event.target.id === 'app'){
                    this.showRightBar = false
                    event.preventDefault();
                    event.stopPropagation();                    
                }

            })
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
            btn,
            tabs
        }
    }
</script>