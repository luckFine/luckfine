<template>
    <div>
        <video :src="value.labelValue" autoplay controls></video>
    </div>   
</template>
    
<script>
  export default {
    props:['itemData'],
    data() {
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
    mounted () {
        console.log(this.itemData.advanceFields)
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
