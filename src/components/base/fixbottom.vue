<style scoped>
.fixBottom{width: 100%;height: 100px;}
.fixBottom img{width: 100%;height: 100px;}
.fixBottomValue{position: fixed;height: 100px;margin-bottom: 0;left: 0;bottom: 0;z-index: 5}
.fixBottomValue img{width: 100%;}
</style>
<template>
    <div class="fixBottom" :class="source === 'default' ? 'fixBottom' : 'fixBottomValue'" >
        <img v-if="itemData.advanceFields" :src="value.labelValue" >
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
            // console.log(this.advanceFields.length)
        }
    }
</script>