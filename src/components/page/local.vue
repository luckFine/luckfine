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
            <li v-for="item,index in datall.advanceFields[0].labelValue" @click="showTab(index)" :key="indnx">
                {{datall.advanceFields[1].tabData[index].labelValue}}
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
                datall:{
                    "name":"tabs",
                    "baseName":"轮播图",
                    "advanceFields":[
                    {
                        "label":"input",
                        "describe":"数量",
                        "labelValue":3
                    },
                    {
                        "label":"inputMore",
                        "inputData":[
                        {
                            "describe":"图片地址",
                            "labelValue":"http://i0.jrjimg.cn/zqt-red-1000/focus/xlive_20180423/images/web/heimaBanner1.jpg" 
                        },
                        {
                            "describe":"图片地址",
                            "labelValue":"http://i0.jrjimg.cn/zqt-red-1000/focus/xlive_20180423/images/web/heimaBanner2.jpg" 
                        },
                        {
                            "describe":"图片地址",
                            "labelValue":"http://i0.jrjimg.cn/zqt-red-1000/focus/xlive_20180423/images/web/heimaBanner3.jpg" 
                        }
                        ],
                        "tabData":[
                            {
                                "describe":"输入文案",
                                "labelValue":"东方证券" 
                            },
                            {
                                "describe":"输入文案",
                                "labelValue":"长城证券" 
                            },
                            {
                                "describe":"输入文案",
                                "labelValue":"老虎证券" 
                            },
                        ]
                    }
                    ],
                    "style":{
                        "width": 480,
                        "height":200,
                        "border-radius":50,
                        "position":"absolute",
                        "left":20,
                        "top":20,
                        "overflow":"hidden"
                    },
                    "children":[]
                },
                active:1
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
                this.active = this.datall.advanceFields[1].inputData[index].labelValue
            }
        },
        mounted () {

        }
    }
</script>