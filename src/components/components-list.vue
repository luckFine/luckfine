<style>

</style>
<template>
    <div>
        <!-- <div id="test">{{vueData}}</div> -->
        <divimg src='http://i0.jrjimg.cn/zqt-red-1000/focus/xlive_20180423/images/web/heimaBanner1.jpg'></divimg>
        <divimg src='http://i0.jrjimg.cn/zqt-red-1000/focus/xlive_20180423/images/web/heimaBanner2.jpg'></divimg>
        <!-- <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link> -->
        <!-- <router-view></router-view> -->
    </div>
</template>
<script>
import divimg from './base/divimg'
import {
    mapState
} from 'vuex'

    export default {
        data () {
            // text: 'demo'
        },
        computed:mapState({
            vueData: state => state.data.dataList
        }),
        components:{
            divimg
        },
        mounted () {
            this.$store.dispatch('data/getList')
        }
    }
</script>