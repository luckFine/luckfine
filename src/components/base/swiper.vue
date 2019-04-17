<template>
  <div class="block">
    <el-carousel height="150px">
      <el-carousel-item v-for="item in advanceFields[1].inputData" >
        <img :src="item.labelValue" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
img{
    width: 100%;height: 100%;display: block
}
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
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
<script>
import {
    mapState
} from 'vuex'

    export default {
        props:['advanceFields'],
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
            advanceFields:{
                handler(){
                    console.log(this.advanceFields[0].labelValue)
                    if(this.advanceFields[0].labelValue === '' ||this.advanceFields[0].labelValue === 0){
                        // this.imgData = this.advanceFields[1].inputData
                        return false
                    }
                    if(this.advanceFields[1].inputData.length < this.advanceFields[0].labelValue){
                        let arr = []
                        for(let a = 0; a < this.advanceFields[0].labelValue-this.advanceFields[1].inputData.length; a++){
                            arr.push(this.item)
                        }
                        this.advanceFields[1].inputData = this.advanceFields[1].inputData.concat(arr)
                    }else{
                        this.advanceFields[1].inputData.length = this.advanceFields[0].labelValue
                        for(let a = 0; a < this.advanceFields[1].inputData.length - this.advanceFields[0].labelValue; a++){
                            this.advanceFields[1].inputData.shift()
                        }
                    }  
                    this.$emit('input', this.advanceFields)               
                },
                deep:true


            }
        },
        computed:{
            // num(){
            //     return this.advanceFields[0].labelValue
            // }
        },
        mounted () {
            // this.imgData = this.advanceFields[1].inputData
            // console.log(this.imgData)
        }
    }
</script>