<template>
  <el-button type="text" @click="open">点击提示弹窗</el-button>
</template>

<script>
  export default {
    data(){
      return {
         msgTitle:'标题名称',
         msgContent:'这是一段内容'
      }
    },
    props:['itemData'],
    methods: {
      open() {
        this.$alert(this.itemData.advanceFields[0].labelValue, this.itemData.advanceFields[1].labelValue, {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      }
    },
    mounted(){
      console.log(this.itemData)
    }
  }
</script>