<style scoped>
.lego{
    width: 100%;
    height: 60px;
    background: rgb(84, 92, 100)
}
</style>

<template>
<div>
    <div class="lego"></div>
    <left-Nav></left-Nav>
</div>
</template>

<script>
import leftNav from '../base/left-nav'

export default { 
  data() {
    return {};
  },

  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
components:{
    leftNav
},
  mounted() {}
};
</script>

<style scoped>
</style>
