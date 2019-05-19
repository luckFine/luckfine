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
    <left-Nav :page-name='page'></left-Nav>
</div>
</template>

<script>
import leftNav from '../base/left-nav'
import {
    mapState
} from 'vuex'
export default { 
  data() {
    return {
    };
  },

  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      formatter(row, column) {
        return row.address;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  },
  components:{
      leftNav
  },
  // computed:mapState({
  //     dataList: state => state.data.dataList
  // }),
  mounted() {
    // this.$store.dispatch('data/getList').then(() => {
    //   console.log(this.dataList)
    // })
  }
};
</script>

<style scoped>
</style>
