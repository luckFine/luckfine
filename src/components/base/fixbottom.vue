<style scoped>
.fixBottom{width: 100%;}
.fixBottom img{width: 100%;}
.delate{position: absolute;top: 0;right: 0;color: #fff;background:blue;cursor: pointer;z-index: 5}
.fixBottomValue{position: fixed;margin-bottom: 0;left: 0;bottom: 0;z-index: 5}
.fixBottomValue img{width: 100%;}
.mainBottom{width: 1000px;position: absolute;top: 0%;left: 50%;margin-left: -500px;height: 100%;}
.children{width: 100%;height: 100%;}
</style>


<template>
    <div :class="source === 'default' ? 'fixBottom' : 'fixBottomValue'" >
        <div class="delate" v-if="source === 'visual'" @click.stop="changeValue(fixed)">
            <el-button type="primary" icon="el-icon-delete"></el-button>
        </div>
        <img id="img" v-if="itemData.advanceFields" :src="value.labelValue" >
        <div class="mainBottom" v-if="itemData.children.length>0" >
            <div 
                :class="[childClass,classname(ele)]"  
                v-if="itemData.children.length>0" 
                v-for="ele,num in itemData.children" 
                @click.prevent.stop="clickItem(ele,num)" 
                :style="StyleSheet(ele)" >
                <div class="delate" @click.prevent.stop="deleteClilden(itemData,num)"  v-if="source === 'visual'">
                    <el-button type="primary" icon="el-icon-delete"></el-button>
                </div>
                <component class="children"  v-bind:is="ele.name" :itemData='ele' key='index'></component>
            </div>
        </div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'
import btn from './../base/btn'
    export default {
        props:['itemData','source','fixed','pageList'],
        data () {
            return {
                imgHieght:''
            }
        },
        computed:{
            value(){
                if(this.itemData.advanceFields.length===1){
                    if(this.itemData.advanceFields[0].labelValue && this.source === 'visual'){
                        let img = new Image();
                        img.src = this.itemData.advanceFields[0].labelValue
                        img.onload = function(){
                            this.imgHieght = img.height
                            document.getElementById("pageContent").style.marginBottom=this.imgHieght+"px";
                        }                        
                    }
                    return this.itemData.advanceFields[0]
                }
            },
            activiyItem: state => state.data.activiyItem,
            activiyIndex: state => state.data.activiyIndex
        },
        components:{
            btn
        },
        methods:{
            changeValue(){
                this.pageList.splice(this.fixed, 1);
            },
            deleteClilden(item,num){
                item.children.splice(num, 1);
            },
            clickItem(item,index){
                if(this.source !== 'visual'){
                    return 
                }else{
                    console.log(item)
                    // this.activiyItem = item
                    this.$store.commit('data/setactiviyItem', item)
                    // this.activiyIndex = index
                    this.$store.commit('data/setactiviyIndex', index)
                    this.showRightBar = true                    
                }

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
            classname(ele){
                if(ele && ele.addclass && ele.addclass.classname){
                    let name = ele.addclass.classname
                    let infinite = ele.addclass.loop === true ? 'infinite' : ''
                    return [name,infinite,'animated']                     
                }else{
                    return false
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
        mounted () {
            
            // console.log(this.advanceFields.length)
        }
    }
</script>