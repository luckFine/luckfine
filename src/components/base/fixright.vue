<style scoped>
.fixright{width:157px;height:260px;}
.fixright img{width:157px;}
.fixrightValue{position: fixed;top: 35%;right: 0;width: 100%;width:157px;height:260px;}
.fixrightValue img{width:157px;}
</style>
<template>
    <div class="fixright">
        <img v-if="advanceFields" :src="value.labelValue" :class="source === 'default' ? 'fixright' : 'fixrightValue'" >
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'

    export default {
        props:['advanceFields','source'],
        data () {
            return {
                
            }
        },
        computed:{
            value(){
                if(this.advanceFields.length===1){
                    return this.advanceFields[0]
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