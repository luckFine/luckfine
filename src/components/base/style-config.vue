<style scoped>
    p{
        cursor: pointer;
        border: 1px solid #e6e6e6;
        border-radius: 25px;
        width: 140px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        margin: 0 auto;
        margin-top: 10px;
    }
</style>
<template>
    <div>
        <div v-for="item,index in stylelist" >
            <p  
            :class="[item.classname,'infinite',{'animated':checkindex === index}]" 
            @click="magicStyle(index)">{{item.classname}}</p>
        </div>
                        
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'

    export default {
        props:['styleData'],
        data () {
            return {
                checkindex:''
            }  
        },
        computed:mapState({
            stylelist: state => state.compontentList.stylelist
        }),
        methods:{
            magicStyle(index){   
                this.checkindex = index
                setTimeout(() => {
                    this.checkindex = ''
                },2000)
            }
        },
        mounted () {
            this.$store.dispatch('compontentList/getStyleList')
        }
    }
</script>