<style scoped>
.lego{
    width: 100%;
    height: 60px;
    background: rgb(84, 92, 100)
}
.content{
  width: 100%;
  height: 100%;
  position: fixed;
  margin-left: 170px;
}
.add{
  background: rgb(84, 92, 100);
  font-size: 15px;
  height: 30px;
  width: 70px;
  color: #fff;
  border-radius: 3px;
  text-align: center;
  line-height:30px;
  margin:20px;
}
</style>

<template>
<div>
    <div class="lego"></div>
    <page-frame :page='"app"'>
      <div class="content" slot="main">
          静等惊喜~
      </div>
    </page-frame>
</div>
</template>

<script>
import pageFrame from './../base/page-frame'
export default { 
  data() {
    return {
     
    };
  },

  methods: {

  },
  components:{
      pageFrame
  },
  mounted() {

  }
};
</script>

<style scoped>
</style>
