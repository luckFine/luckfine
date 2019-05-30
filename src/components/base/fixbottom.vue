<style scoped>
.fixBottom{width: 100%;}
.fixBottom img{width: 100%;}
.delate{width: 30px;height: 30px;position: absolute;top: 0;right: 0;color: #fff;background:blue;cursor: pointer;z-index: 5}
.fixBottomValue{position: fixed;margin-bottom: 0;left: 0;bottom: 0;z-index: 5}
.fixBottomValue img{width: 100%;}
</style>


<template>
    <div :class="source === 'default' ? 'fixBottom' : 'fixBottomValue'" >
        <div class="delate" v-if="source === 'visual'" @click.stop="changeValue(fixed)">{{fixed}}</div>
        <img id="img" v-if="itemData.advanceFields" :src="value.labelValue" >
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'

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
            }
        },
        methods:{
            changeValue(){
                this.pageList.splice(this.fixed, 1);
            }
        },
        mounted () {
            
            // console.log(this.advanceFields.length)
        }
    }
</script>