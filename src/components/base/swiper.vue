<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    /* line-height: 150px; */
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  div >>>.el-carousel__container{
        height:100px; 
     }
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .block{
      width:100%;
      min-height:100px;
      overflow: hidden;
  }
  img{
      width: 100%;
      height: 100%;
      display: block;
  }
</style>
<template>
  <div class="block">
        <el-carousel :height="itemData.style.height+'px'">
                <el-carousel-item v-for="(item,index) in itemData.advanceFields[1].inputData" :key="index" >
                        <img :src="item.labelValue" alt="">
                </el-carousel-item>           
        </el-carousel>
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
                imgData:[],
                item:{
                    'describe':'图片地址',
                    'labelValue':''
                }
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
            }
        },
        mounted () {

        }
    }
</script>