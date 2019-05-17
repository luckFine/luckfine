<style scoped>
ul>li{width: 33.3%;float: left;height: 500px;padding: 10px;box-sizing: border-box;}
</style>
<template>
    <div class="pageView">
        <div  
        v-for="item,index in pageList" 
        @click.prevent.stop="clickItem(item,index)" 
        class="list-group-item pageClass father" 
        :key="index">
            <component  v-bind:is="item.name" :itemData='item'></component>
            <div class="childClass" v-if="item.children.length>0" v-for="ele,num in item.children" @click.prevent.stop="clickItem(ele,num)" :style="StyleSheet(ele)" >
                <component class="children"  v-bind:is="ele.name" :itemData='ele' key='index'></component>
            </div>
        </div>              
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
import unitConfig from './../base/unit-config'
import styleConfig from './../base/style-config'
import componentsList from './../components-list'
import {
    mapState
} from 'vuex'

    export default {
        data(){
            return{
                pageList:[] // 当前选中组件
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
                let obj = this.deepClode(ele.style)
                Object.keys(obj).forEach((key) => {
                    if( typeof(obj[key]) == 'number'){
                        let str = obj[key].toString()
                        obj[key] = str+'%'
                    }
                })
                return obj                
            }
        },
        computed:{
        },
        mounted () {
            this.pageList = JSON.parse(window.localStorage.getItem('pageList'))
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
            btn
        },
    }
</script>