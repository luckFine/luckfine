<style scoped>
.tab{
    width: 100%;
    border: 1px solid black;
    display:flex; 
    justify-content: space-between
}
.tab li{
    width: 100%;
    height: 50px;
    border: 2px solid black;
    background-color: red;
    font-size: 30px;
    color: white;
    flex-shrink: 1;
}
img{
    width: 100%;
    height: 100%;
    display: block;
}
.block{
    width: 500px;
    margin: 0 auto;
}
</style>
<template>
  <div class="block">
        <ul class="tab">
            <li v-for="item,index in itemData.advanceFields[0].labelValue" @click.prevent.stop="showTab(index)" :key="indnx">
                {{itemData.advanceFields[1].tabData[index].labelValue}}
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

    export default {
        props:['itemData'],
        data () {
            return{
                itemData:'',
                active:''
            }
        },
        watch:{
            itemData: {
                handler() {
                    let inputValue = Number(this.itemData.advanceFields[0].labelValue);
                    let swiper = this.itemData.advanceFields[1].inputData;
                    let swiperLength = swiper.length;
                    if(!inputValue) return false;
                    let distance = Math.abs(inputValue - swiperLength);
                    if(swiperLength < inputValue){
                        for(let a = 0; a < distance; a++){
                          swiper.push({
                              'describe':'图片地址',
                              'labelValue':''
                            })
                        }
                    }
                    else {
                        for(let a = 0; a < distance; a++){
                          swiper.pop()
                        }
                    }
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
            StyleSheet(ele){
                let obj = this.deepClode(ele.style)
                Object.keys(obj).forEach((key) => {
                    if( typeof(obj[key]) == 'number'){
                        let str = obj[key].toString()
                        obj[key] = str+'px'
                    }
                })
                return obj                
            },
            showTab(index){
                this.active = this.itemData.advanceFields[1].inputData[index].labelValue
            }
        },
        mounted () {
            this.showTab(0)
            console.log(this.itemData)
        }
    }
</script>