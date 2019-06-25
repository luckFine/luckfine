<style scoped>
img{width: 100%;height: 100%;display: block;}
</style>
<template>
    <ul>
        <li v-for="item in advanceFields">
            <img src="" alt="">
            <p></p>
        </li>
    </ul>
</template>
<script>
import {
    mapState
} from 'vuex'

    export default {
        props:['itemData','source'],
        data () {
            return {
                
            }
        },
        computed:{

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
                if(this.itemData.isBuy.isBuy){
                    this.buy()
                }else{
                    window.open(this.eventHref)
                }
            }
        },
        mounted () {
            // alert(this.source)
            console.log(this.itemData)
            if(this.source === 'preview'){
                var element=document.getElementById("botton")
                var slef = this
                element.addEventListener('click',function(){
                    slef.event()
                })
            }else{
                return
            }
        }
    }
</script>