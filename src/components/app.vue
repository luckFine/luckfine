<style scoped>
ul>li{width: 33.3%;float: left}
</style>
<template>
    <div>

        <draggable v-model="colors" @update="datadragEnd" :options = "{animation:500}">
                <transition-group>
                    <div v-for="element in colors" :key="element.text" class = "drag-item">
                        {{element.text}}
                    </div>
                </transition-group>
        </draggable>

        <!-- <ul>
            <li>
                <components-list></components-list>                   
            </li>
            <li></li>
            <li></li>
        </ul> -->
    </div>
</template>
<script>
import $ from 'jquery'
import draggable from 'vuedraggable'
import api from './../mock/componentsList'
import componentsList from './components-list'
import {
    mapState
} from 'vuex'

    export default {
        data(){
            return{
                msg:"这是测试组件",
                colors: [
                    {
                        text: "Aquamarine",
                    }, 
                    {
                        text: "Hotpink",
                    }, 
                    {
                        text: "Gold",
                    }, 
                    {
                        text: "Crimson",
                    }, 
                    {
                        text: "Blueviolet",
                    },
                    {
                        text: "Lightblue",
                    }, 
                    {
                        text: "Cornflowerblue",
                    }, 
                    {
                        text: "Skyblue",
                    }, 
                    {
                        text: "Burlywood",
                    }
                ],
                startArr:[],
                endArr:[],
                count:0,
            }
        },
        methods:{
            getdata (evt) {
                console.log(evt.draggedContext.element.text)
            },
            datadragEnd (evt) {
                evt.preventDefault();
                console.log('拖动前的索引 :' + evt.oldIndex)
                console.log('拖动后的索引 :' + evt.newIndex)
                console.log(this.colors);
            }
        },
        mounted () {
	        //为了防止火狐浏览器拖拽的时候以新标签打开，此代码真实有效
            document.body.ondrop = function (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            $.ajax({
                url: '/user/userInfo',
                success:function(data){
                    console.log(data)
                }
            })
        },
        components:{
            draggable,
            componentsList
        },
    }
</script>