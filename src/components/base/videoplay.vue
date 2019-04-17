<template>
    <div>
        <video :src="value.labelValue" autoplay controls></video>
    </div>   
</template>
    
<script>
  export default {
    props:['advanceFields'],
    data() {
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
    mounted () {
        console.log(this.advanceFields)
    }
  };
</script>
<style scoped>
div{
    width: 100%;
    height: 200px;
    background: #fff
}
video{
    width: 100%;
    height: 100%;
}
</style>
