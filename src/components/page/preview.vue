<style scoped>
ul>li{width: 33.3%;float: left;height: 500px;padding: 10px;box-sizing: border-box;}
.pageClass{position: relative;width: 100%;}
.mainContent{width: 1000px;position: absolute;top: 0%;left: 50%;margin-left: -500px;height: 100%;}
</style>
<template>
    <div class="pageView">
        <div  
        v-for="item,index in pageList" 
        class="list-group-item pageClass father" 
        :key="index">
            <component  
                v-bind:is="item.name" 
                :source='"preview"' 
                :fixed='index'
                :itemData='item'>
            </component>
            <div class="mainContent">
                <div :class="[childClass,classname(ele)]" 
                    v-if="item.children.length>0" 
                    v-for="ele,num in item.children" 
                    :style="StyleSheet(ele)"
                    >
                    <component :source='"preview"'  class="children"  v-bind:is="ele.name" :itemData='ele' key='index'></component>
                </div>                
            </div>

        </div>
        <!-- <div class="childClass" 
            v-if="item.children.length>0" 
            v-for="ele,num in item.children" 
            @click.prevent.stop="clickItem(ele,num)" 
            :style="StyleSheet(ele)" >
            <div class="delate" @click.prevent.stop="deleteClilden(item,num)">{{index}}</div>
            <component class="children"  v-bind:is="ele.name" :itemData='ele' key='index'></component>
        </div> -->



    </div>
</template>
<script>
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

    export default {
        data(){
            return{
                pageList:[], // 当前选中组件
                id:this.$route.params.id
            }
        },
        methods:{
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
            StyleSheet(ele){
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
         
            },
            classname(ele){
                if(ele.addclass && ele.addclass.classname){
                    let name = ele.addclass.classname
                    let infinite = ele.addclass.loop === true ? 'infinite' : ''
                    return [name,infinite,'animated']                         
                }else{
                    return ''
                }
           
            }
        },
        computed:mapState({
            pageDetailData: state => state.data.pageDetailData
        }),
        mounted () {
            // this.pageList = JSON.parse(window.localStorage.getItem('pageList'))
            console.log(this.id);
            if(this.id){
                this.$store.dispatch('data/pageDetail',{id:this.id}).then(() => {
                    this.pageList = this.pageDetailData.result.content
                })
            }else{
                this.pageList = JSON.parse(window.localStorage.getItem('pageList'))
            }
	        //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
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
        },
    }
</script>