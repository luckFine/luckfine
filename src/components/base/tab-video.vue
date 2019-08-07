<style scoped>
.tab{
    width: 33%;
    /* border: 1px solid black; */
    display:flex; 
    /* justify-content: space-between; */
    flex-direction: column;
    flex:1;
    float: right;
    padding-bottom: 17px;
    position: relative;
    padding-top: 20px;
    /* background:#5c5c5c; */
}
.tab li{
    width: 100%;
    float: left;
    flex:1;
    align-self: auto;
    align-items:flex-start;
    cursor: pointer;
    color: #fff;
    text-align: center;
    font-size: 14px; 
    /* height: 40px; */
    position: relative;
}
.tab li:hover{
    color: #dea148;
}
.tab li span{
    margin-top: 8px;
    line-height: 14px;
    display: block;
}
.tab li p{
    font-size: 16px;
    line-height: 16px;
    font-weight: bold;
    text-indent: 30px;
    padding-top: 17px;
}
img{
    width: 100%;
    height: 100%;
    display: block;
}
.block{
    width: 100%;
    height: 330px;
    margin: 0 auto;
    background:#5c5c5c;
}
.tabContent{
    width: 67%;
    float: left;
    flex:1;
    height: 100%;
}
video{
    width:100%;
    height: 100%;
}
.fixImg{
    width: 286px;
    height: 172px;
    position: absolute;
    top: 30px;
    display: none;
    left: 140px;;
}
.hoverImg:hover .fixImg{
    display: block;
    z-index: 999;
}
</style>
<template>
  <div class="block">
        <ul class="tab">
            <li>
                <p>第一节 《抄底篇—打草惊蛇》</p>
                <span>掌握每笔均量 捕捉主力建仓</span>
            </li>
            <li class="hoverImg">
                <p>第二节：《抄底篇—暗度陈仓》</p>
                <span>识别空头陷阱 把握抄底良机</span>
                <img class="fixImg" src="https://up0.z3quant.com/images/jrjact/2019/8/16030823w09-b1gQ8eB0.png" alt="">
            </li>
            <li class="hoverImg">
                <p>第三节：《抄底篇—声东击西》</p>
                <span>甄别主力意图 追随主力布局</span>
                <img class="fixImg" src="https://up0.z3quant.com/images/jrjact/2019/8/16030823w09-b1gQ8eB0.png" alt="">
            </li>
            <li class="hoverImg">
                <p>第四节：《抄底篇—反客为主》</p>
                <span>鉴别多空转换 聚集行情反转</span>
                <img class="fixImg" src="https://up0.z3quant.com/images/jrjact/2019/8/16030823w09-b1gQ8eB0.png" alt="">
            </li>
            <li class="hoverImg">
                <p>第五节：《抄底篇—趁火打劫》</p>
                <span>判别利空建仓 精准逢低布局</span>
                <img class="fixImg" src="https://up0.z3quant.com/images/jrjact/2019/8/16030823w09-b1gQ8eB0.png" alt="">
            </li>
        </ul>
         <ul class="tabContent">
            <!-- <li> -->
                <video poster="https://up0.z3quant.com/images/jrjact/2019/8/29560483xgHB4P_c0rup.jpg"  autoplay controls src="http://flv.jrj.com.cn/src_video/20190807/2584a65152e2cde11412a9bdb4878ecb/GQ/5d4a28297dbbe.mp4 "></video>
            <!-- </li> -->
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
                    this.showTab('0')
                },10)
            }
        }
    }
</script>