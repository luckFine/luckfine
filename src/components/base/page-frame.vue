<style scoped>

</style>
<template>
    <div>
        <left-Nav :pagename='page'></left-Nav>
        <div class="content-page">
            <slot name="main"></slot>
        </div>
    </div>
</template>
<script>
import {
    mapState
} from 'vuex'
    import leftNav from './left-nav'
    export default {
        props:['page'],
        data () {
            return {
                
            }
        },
        computed:{

        },
        components:{
            leftNav
        },
        watch: {

        },
        mounted () {
        // console.log(this.page)
        }
    }
</script>