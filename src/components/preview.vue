<style scoped>
ul>li{width: 33.3%;float: left;height: 500px;padding: 10px;box-sizing: border-box;}
</style>
<template>
    <div>
        <div v-for="item in pageList" @click="clickItem(item.advanceFields)">
            <component  v-bind:is="item.name" :advanceFields='item.advanceFields'></component>
        </div>        
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
                pageList:[] // 当前选中组件
            }
        },
        methods:{
            // preview(){
            //     // 保存当前pageList
            //     localStorage.setItem('pageList',JSON.stringify(this.pageList))
            // }
        },

        mounted () {
            this.pageList = JSON.parse(window.localStorage.getItem('pageList'))
	        //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
        },
        components:{
            draggable,
            divimg,
            swiper,
            componentsList
        },
    }
</script>