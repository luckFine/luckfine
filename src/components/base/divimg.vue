<style scoped>
img{width: 100%;height: 100%;display: block;}
</style>
<template>
    <div>
        <img v-if="advanceValues" :src="advanceValues.src" alt="">
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'

    export default {
        props:['advanceValues'],
        data () {
            // text: 'demo'
        },
        mounted () {
            // console.log('0000')
        }
    }
</script>