<style scoped>
img{width: 100%;height: 100%;display: block;}
</style>
<template>
    <div id="botton" class="bottonMore" @click="event" :style="'height:'+itemData.style.height+'px'">
        {{value.labelValue}}
    </div>
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
            value(){
                if(this.itemData.advanceFields.length===1){
                    return this.itemData.advanceFields[0]
                }
            },
            eventHref(){
                return this.itemData.clickEventHref.href
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
            buy(){
                if(window.sso_userID != ''){
                    window.location.href = 'http://itougu.jrj.com.cn/activity/web/groupOrderWeb.jspa#/?productSubId='+this.itemData.isBuy.productId+'&type='+this.itemData.isBuy.type+'&bizCode=5&productId='+this.itemData.isBuy.productSubId+'&offLine=1'
                }else{
                    window.location.href = 'http://sso.jrj.com.cn/sso/ssopassportlogin?ReturnURL=' + encodeURIComponent(window.location.href)
                    return
                }
            },
            event(href){
                if(this.$route.name === 'preview' || this.$route.name === 'activity'){
                    if(this.itemData.isBuy.isBuy){
                        this.buy()
                    }else{
                        window.open(this.eventHref)
                    }                       
                }{
                    return 
                }

            }
        },
        mounted () {
            // console.log(this.$route.name)
            // if(this.$route.name === 'preview'){
            //     var elements=document.getElementsByClassName('bottonMore')
            //     var slef = this
            //     for(let a = 0 ; a <elements.length ; a++){
            //         elements[a].addEventListener('click',function(){
            //             return slef.event()
            //         })                 
            //     }

            // }else{
            //     return
            // }
        }
    }
</script>