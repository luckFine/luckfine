<style scoped>
.fixright{width:157px;height:260px;}
.fixright img{width:157px;}
.fixrightValue{position: fixed;top: 35%;right: 0;width: 100%;width:157px;height:260px;z-index: 9}
.fixrightValue img{width:157px;}
</style>
<template>
    <div class="fixright"  :class="source === 'default' ? 'fixright' : 'fixrightValue'" >
        <img v-if="itemData.advanceFields" :src="value.labelValue">
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
        mounted () {
            console.log(this.source)
        }
    }
</script>