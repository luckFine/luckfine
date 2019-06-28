<style scoped>
/* .viewBox{width: 100%;min-height:800px;} */
.comBox{position: relative;}
.center{text-align: center}
.pageClass{position: relative;width: 100%;}
.pageClass:hover,.childClass:hover{border: 1px solid red;opacity: 0.8}
.pageClass:hover .delate,.childClass:hover .delate{display: block;}
.delate{position: absolute;top: 0;right: 0;color: #fff;display:none;cursor: pointer;z-index: 5}
.childClass{position: absolute;top: 0;left: 0;white-space:nowrap}
.bottomBox{width:100%;height:60px;position: fixed;left: 0;bottom: 0;z-index: 20;}
/* 左侧导航 */
.tabBar{width:80px;height: 100%; position: fixed;left: 0;top: 0;color: #fff;background:rgb(84, 92, 100);z-index: 10;padding-top: 50px;box-sizing: border-box;}
.tabBar i{font-size: 1.5em;display: block;margin: 0 auto;padding: 10px;box-sizing: border-box;color:#fff;}
.tabBar p{text-align: center;}
.tabBarContent{width: 300px;position: fixed;top: 0;z-index: 9;left: -300px;background: #fff;box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);padding: 10px;box-sizing: border-box;height: 100%;overflow-y: scroll;}
.rightBar{width:350px;position: fixed;right: -350px;top: 10%;background: #fff;z-index: 10;}
.showRightBar{transition: right 0.7s;right: 0;}
.showRightBarFalse{transition: right 0.7s;right: -350px;}
.activityBar{transition: left 0.7s;left: 80px;}
.activityBarFalse{transition: left 0.7s;left: -300px;}
/* 主视图 */
.mainContent{width: 1000px;position: absolute;top: 0%;left: 50%;margin-left: -500px;height: 100%;}
.comBox >>>.popBtn,.comBox >>>#botton,.comBox .message{width:150px;height:40px;line-height:40px;font-size: 16px;text-align: center;border-radius: 40px;background:rgb(84, 92, 100);margin: 0 auto;color: #fff;}
.comBox >>>.tab{background-color:rgb(84, 92, 100);color:#fff;}
/* .home{margin-bottom: 100px;} */
/* .drag-item{min-height: } */
.tabBtn i{font-size: 2em;display: block;margin: 0 auto;padding: 10px;box-sizing: border-box;color:#fff;;}
.tabBtn{width:52px;height:52px; position:fixed;top:5%;right:0%;background-color:rgb(84, 92, 100);border-radius:50%;z-index:99;box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);}
.tabBar p{border: 1px solid #fff;width: 80%;margin: 0 auto;margin-top: 12px;line-height: 28px;border-radius: 15px;}
img{width: 100%;}
.phone{width: 375px;height: 740px;margin: 0 auto;overflow-y: scroll;margin-top: 80px;border: 10px solid #222;border-radius: 40px;}
.iphone-screen::-webkit-scrollbar {
    display: none;
}
/* 样式1 */
.iphone {
    box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.2), 0 0 0 1px #999, 0 0 30px 0px rgba(0, 0, 0, 0.7);
    border: 5px solid #d9dbdc;
    background: #f8f8f8;
    padding: 15px;
    border-radius: 50px;
    height: 877px;
    width: 423px;
    margin: 0 auto;
    position: relative;
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
}
.iphone-top {
    padding: 5px 110px 40px;
    position: relative;
}
.iphone-top .speaker {
    display: block;
    width: 70px;
    height: 6px;
    margin: 0 auto;
    border-radius: 6px;
    background: #292728;
}
.iphone-top .camera {
    display: block;
    margin: 0 auto;
    height: 10px;
    width: 10px;
    border-radius: 50%;
    margin-bottom: 13px;
    background: #333;
}
.iphone-top .sensor {
    display: block;
    width: 15px;
    height: 15px;
    float: left;
    background: #333;
    margin-top: -5px;
    border-radius: 50%;
}
.iphone .top-bar, .iphone .bottom-bar {
    display: block;
    width: 423px;
    height: 15px;
    border-left: 5px solid #BBB;
    border-right: 5px solid #BBB;
    position: absolute;
    left: -5px;
}
.iphone .top-bar {
    top: 65px;
}
.iphone .bottom-bar {
    bottom: 65px;
}
.iphone-screen {
    background: #eee;
    border: 1px solid #fff;
    height: 710px;
    width: 375px;
    margin: 0 auto;
    border: 2px solid rgba(0, 0, 0, 0.9);
    border-radius: 3px;
    overflow-y: scroll;
}
.iphone-screen img {
    width: 100%;
}
.iphone .buttons .on-off, .iphone .buttons .up, .iphone .buttons .down, .iphone .buttons .sleep {
    display: block;
    background: #CCC;
    position: absolute;
    border-radius: 2px 0px 0px 2px;
}
.iphone .buttons .on-off {
    height: 40px;
    width: 3px;
    top: 100px;
    left: -8px;
}
.iphone .buttons .up, .iphone .buttons .down, .iphone .buttons .sleep {
    height: 60px;
    width: 5px;
    left: -10px;
}
.iphone .buttons .up {
    top: 170px;
}
.iphone .buttons .down {
    top: 250px;
}
.iphone .buttons .sleep {
    left: auto;
    right: -10px;
    top: 170px;
    border-radius: 0px 2px 2px 0px;
}
.iphone-bottom {
    padding: 10px 0 0;
}
.iphone-bottom span {
    display: block;
    margin: 0 auto;
    width: 68px;
    height: 68px;
    background: #ccc;
    border-radius: 50%;
    background: -webkit-linear-gradient(315deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
    background: linear-gradient(135deg, #303233 0%, #b5b7b9 50%, #f0f2f2 69%, #303233 100%);
    position: relative;
}
.iphone-bottom span:after {
    content: "";
    display: block;
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: 4px;
    top: 4px;
}
</style>
<template>
    <div class="pageContent" id="pageContent">
        <div class='tabBtn' @click='showRightBarFun'>
            <i :class="showRightBar?'el-icon-s-fold':'el-icon-s-unfold'"></i>
        </div>
        <ul class="tabBar">
            <div @click="cancel" class="home">
                <!-- <i class="el-icon-s-home"></i> -->
                <!-- <p slot="title">首页</p>                     -->
            </div>
            <li @click="activity('1')">
                <!-- <i class="el-icon-s-management"></i> -->
                <p slot="title">banner</p>                    
            </li>
            <li @click="activity('2')" :class="{'activityBar':activityBar === '2'}">
                <!-- <i class="el-icon-s-order"></i> -->
                <p slot="title">TAB</p>                    
            </li>
            <li @click="activity('3')" :class="{'activityBar':activityBar === '3'}">
                <!-- <i class="el-icon-s-open"></i> -->
                <p slot="title">列表</p>
            </li>
            <li @click="activity('4')" :class="{'activityBar':activityBar === '4'}">
                <!-- <i class="el-icon-s-data"></i> -->
                <p slot="title">引言</p>
            </li>
            <li @click="activity('5')" :class="{'activityBar':activityBar === '5'}">
                <!-- <i class="el-icon-s-data"></i> -->
                <p slot="title">配图</p>
            </li>
            <li @click="activity('6')" :class="{'activityBar':activityBar === '6'}">
                <!-- <i class="el-icon-s-data"></i> -->
                <p slot="title">段落</p>
            </li>
            <li @click="activity('7')" :class="{'activityBar':activityBar === '7'}">
                <!-- <i class="el-icon-s-data"></i> -->
                <p slot="title">按钮</p>
            </li>
            <li @click="activity('8')" :class="{'activityBar':activityBar === '8'}">
                <!-- <i class="el-icon-s-data"></i> -->
                <p slot="title">规则</p>
            </li>
            <li @click="activity('9')" :class="{'activityBar':activityBar === '9'}">
                <!-- <i class="el-icon-s-data"></i> -->
                <p slot="title">页脚</p>
            </li>
        </ul>
        <!-- <div> -->
            <div :class="[{'activityBar':activityBar === '1'},'tabBarContent']">
                <!-- 345678  -->
                <img src="../../assets/img/a.png" alt="" >
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
        <!-- <div class="phone"> -->
		<div class="iphone">
		    <div class="iphone-top">
		      <span class="camera"></span>
		      <span class="sensor"></span>
		      <span class="speaker"></span>
		    </div>
		    <div class="top-bar"></div>
		    <div class="iphone-screen">
		      <img src="../../assets/img/b.png" alt="" >
		    </div>
		    <div class="buttons">
		      <span class="on-off"></span>
		      <span class="sleep"></span>
		      <span class="up"></span>
		      <span class="down"></span>
		    </div>
		    <div class="bottom-bar"></div>
		    <div class="iphone-bottom">
		      <span></span>
		    </div>
		</div>
            <!-- <div> -->
                <!-- <img src="../../assets/img/b.png" alt="" > -->
            <!-- </div> -->
        <!-- </div> -->
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
// import divList from './../base/divList'
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
                wholePage:{
                    title:'',
                    backgroud:'#e6e6e6'
                },
                activityBar:'',
                showRightBar:false
            }
        },
        methods:{
            showRightBarFun(){
                this.showRightBar=!this.showRightBar
            },
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
                // console.log(item)
                // this.activiyItem = item
                this.$store.commit('data/setactiviyItem', item)
                // this.activiyIndex = index
                // console.log(this.activiyIndex)
                this.$store.commit('data/setactiviyIndex', index)
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
                if(ele && ele.addclass && ele.addclass.classname){
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
                console.log(ele)
                if(ele){
                    let obj = this.deepClode(ele.style)
                    Object.keys(obj).forEach((key) => {
                        if( typeof(obj[key]) == 'number'){
                            let str = obj[key].toString()
                            obj[key] = str+'px'
                        }
                    })
                    return obj                      
                }else{
                    return ''
                }
              
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
                    for(let a = 0; a <this.morePicArr.length;a++){
                        let obj = this.deepClode(data)
                        obj.advanceFields[0].labelValue = this.morePicArr[a]
                        this.pageList.push(obj)    
                        // console.xlog(this.pageList)                      
                    }

                },
                deep:true
            }
        },
        computed:mapState({
            savePage: state => state.data.savePageResult,
            morePicArr: state => state.data.morePicArr,
            pageDetailData: state => state.data.pageDetailData,
            activiyItem: state => state.data.activiyItem,
            activiyIndex: state => state.data.activiyIndex
        }),
        mounted () {
            //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            if(this.$route.params.id){
                // alert('编辑')
                this.$store.dispatch('data/pageDetail',{
                    id:this.$route.params.id
                }).then(() => {
                    if(this.pageDetailData.errCode === 0){
                        this.pageList = this.pageDetailData.result.content
                        this.wholePage = this.pageDetailData.result.wholePage
                    }
                })
            }else{
                // alert('新建')
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
            // divList
        }
    }
</script>