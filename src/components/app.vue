<style>

</style>
<template>
    <div>
        <div id="test">{{vueData}}</div>
        <router-link to="/foo">Go to Foo</router-link>
        <router-link to="/bar">Go to Bar</router-link>
        <router-view></router-view>
    </div>
</template>
<script>
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
        mounted () {
            this.$store.dispatch('data/getList')
        }
    }
</script>