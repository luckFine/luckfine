<style scoped>
/* .fixright{width:157px;height:260px;} */
.fixright img{width:157px;}
.delate{width: 30px;height: 30px;position: absolute;top: 0;right: 0;color: #fff;background:blue;cursor: pointer;z-index: 5}
.fixrightValue{position: fixed;top: 35%;right: 0;width: 100%;width:157px;height:260px;z-index: 9}
.fixrightValue img{width:157px;}
</style>
<template>
    <div class="fixright"  :class="source === 'default' ? 'fixright' : 'fixrightValue'" >
        <div class="delate" v-if="source === 'visual'" @click.stop="changeValue(fixed)">{{fixed}}</div>
        <img v-if="itemData.advanceFields" :src="value.labelValue">
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
                
            }
        },
        computed:{
            value(){
                if(this.itemData.advanceFields.length===1){
                    return this.itemData.advanceFields[0]
                }
            }
        },
        watch: {
            advanceFields:{
                handler(){
                    console.log('luckfine')
                },
                deep:true
            }
        },
        methods:{
            changeValue(){
                this.pageList.splice(this.fixed, 1);
            }
        },
        mounted () {
            
        }
    }
</script>