<style scoped>
ul>li{width: 33.3%;float: left;height: 500px;}
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
                        <component  v-bind:is="item.name" :advanceValues='item.advanceValues'></component>
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
                    <div v-for="item in pageList"  class = "">
                        <component  v-bind:is="item.name" :advanceValues='item.advanceValues'></component>
                    </div>        
                </draggable>    
            </li>
            <li></li>
        </ul>
    </div>
</template>
<script>
import $ from 'jquery'
import draggable from 'vuedraggable'
import api from './../mock/componentsList'
import divimg from './base/divimg'
import componentsList from './components-list'
import {
    mapState
} from 'vuex'

    export default {
        data(){
            return{
                msg:"这是测试组件",
                showDrag:false,
                listData: [],
                startArr:[],
                pageList:[],
                endArr:[],
                count:0,
                controlOnStart:true
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
                this.pageList.push(id)
                // return id
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
        },
        components:{
            draggable,
            divimg,
            componentsList
        },
    }
</script>