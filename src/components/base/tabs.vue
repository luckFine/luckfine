<style scoped>
.tab{
    width: 100%;
    /* border: 1px solid black; */
    display:flex; 
    justify-content: space-between
}
.tab li{
    width: 100%;
    /* height: 50px; */
    /* border: 2px solid black; */
    background: red;
    /* font-size: 30px; */
    /* color: white; */
    flex-shrink: 1;
}
img{
    width: 100%;
    height: 100%;
    display: block;
}
.block{
    width: 100%;
    margin: 0 auto;
}
</style>
<template>
  <div class="block">
        <ul class="tab">
            <li 
                :style="{width:liWidth+'%',background:'url('+itemData.advanceFields[0].normalBg+') no-repeat',height:itemData.advanceFields[0].normalBg+'px'}" 
                v-for="(item,index) in itemData.advanceFields[1].inputData" 
                @click.stop.prevent="showTab(index)" 
                :key="index">
                {{itemData.advanceFields[1].inputData[index].tabName}}
            </li>
        </ul>
         <ul class="tabContent">
            <li>
                <img :src="active" alt="">
            </li>
        </ul>       
  </div>
</template>

<script>
import {
    mapState
} from 'vuex'
import { constants } from 'crypto';
import { setTimeout } from 'timers';

    export default {
        props:['itemData'],
        data () {
            return{
                active:'',
                liWidth:''
            }
        },
        watch:{
            itemData: {
                handler() {
                    let inputValue = Number(this.itemData.advanceFields[0].labelValue);
                    let tabs = this.itemData.advanceFields[1].inputData;
                    let tabsLength = tabs.length;
                    if(!inputValue) return false;
                    let distance = Math.abs(inputValue - tabsLength);
                    this.liWidth = 100/this.itemData.advanceFields[0].labelValue
                    if(tabsLength < inputValue){
                        for(let a = 0; a < distance; a++){
                          tabs.push({
                              'tabName':'输入tab名称',
                              'imgSrc':'输入图片地址'
                            })
                        }
                    }
                    else {
                        for(let a = 0; a < distance; a++){
                          tabs.pop()
                        }
                    }
                    console.log(this.itemData.advanceFields)
                    this.$emit('input', this.itemData.advanceFields)
                },
                deep: true
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
            showTab(index){
                // if(this.itemData.advanceFields){
                    this.active = this.itemData.advanceFields[1].inputData[index].imgSrc
                // }else{
                //     setTimeout(() => {
                //         this.showTab('0')
                //     },10)
                // }
                
            }
        },
        mounted () {
            if(this.itemData){
                this.showTab('0')
                // this.active = this.itemData.advanceFields[1].inputData[index].imgSrc
            }else{
                setTimeout(() => {
                    console.log('56789')
                    this.showTab('0')
                },10)
            }
        }
    }
</script>