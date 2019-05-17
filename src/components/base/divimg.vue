<style scoped>
img{width: 100%;height: 100%;display: block;}
</style>
<template>
    <div>
        <img v-if="itemData.advanceFields" :src="value.labelValue" alt="">
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'

    export default {
        props:['itemData'],
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