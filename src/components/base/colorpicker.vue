<template>
    <el-color-picker v-model="color" show-alpha></el-color-picker>
</template>
    
<script>
  export default {
    data() {
      return {
        color: ''
      }
    },
    watch:{
      color(){
        this.$emit('colorpicker',this.color)
      }
    }
  };
</script>