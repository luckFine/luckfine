<style scoped>
img{width: 100%;height: 100%;display: block;}
</style>
<template>
    <div class="botton" :style="StyleSheet" >
        {{value.labelValue}}
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'

    export default {
        props:['itemData'],
        data () {
  
        },
        computed:{
            value(){
                if(this.itemData.advanceFields.length===1){
                    return this.itemData.advanceFields[0]
                }
            },
            StyleSheet(){
                let obj = this.deepClode(this.itemData.style)
                Object.keys(obj).forEach((key) => {
                    if( typeof(obj[key]) == 'number'){
                        let str = obj[key].toString()
                        obj[key] = str+'px'
                    }
                })
                return obj                
            }
        },
        watch: {
            itemData:{
                handler(){
                    // console.log(this.itemData.style)
                },
                deep:true
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
            event(href){
                window.location.href = href
            }
        },
        mounted () {
            
        }
    }
</script>