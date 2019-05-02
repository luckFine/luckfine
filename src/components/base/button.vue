<style scoped>
img{width: 100%;height: 100%;display: block;}
</style>
<template>
    <div>
        <div class="botton">
            {{value}}
        </div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'

    export default {
        props:['advanceFields'],
        data () {
            // text: 'demo'
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
            console.log('shiwo')
            console.log(this.advanceFields)
        }
    }
</script>