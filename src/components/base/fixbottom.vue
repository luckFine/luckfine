<style scoped>
.fixBottom{width: 100%;height: 100px;}
.fixBottom img{width: 100%;height: 100px;}
.fixBottomValue{position: fixed;height: 100px;margin-bottom: 0;float: left;}
.fixBottomValue img{width: 100%;}
</style>
<template>
    <div class="fixBottom">
        <img v-if="advanceFields" :src="value.labelValue" :class="source === 'default' ? 'fixBottom' : 'fixBottomValue'" >
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
            // console.log(this.advanceFields.length)
        }
    }
</script>