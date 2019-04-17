<template>
    <el-color-picker v-model="color" show-alpha></el-color-picker>
</template>
    
<script>
  export default {
    data() {
      return {
        color: ''
      }
    }
  };
</script>