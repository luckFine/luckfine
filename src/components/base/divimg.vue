<style scoped>
img{width: 100%;height: 100%;display: block;margin-top: 10px;}
</style>
<template>
    <div>
        <img :src="src" alt="">
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'

    export default {
        props:['src'],
        data () {
            // text: 'demo'
        },
        mounted () {
            console.log('0000')
        }
    }
</script>