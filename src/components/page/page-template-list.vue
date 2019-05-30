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
  overflow: scroll;
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
/* xitong */
body {
  margin: 5px;
  font-family: Helvetica, sans-serif;
}
.item {
  position: absolute;
  top: 5px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  font-size: 1.2em;
  color: rgb(0,158,107);
  box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
  overflow-y: scroll;
}
.addNew{
  display: none
}
.item:hover .addNew{
  width: 100%;
  height: 60px;
  line-height: 64px;
  font-size: 18px;
  text-align: center;
  background: rgb(84, 92, 100);
  color: rgb(255, 208, 75);
  position: absolute;
  left: 0;
  bottom: 0;  
  display:block;
}
.compontentBox{
  pointer-events: none
}
.item:after {
  content: attr(index);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.wf-transition {
  transition: opacity .3s ease;
  -webkit-transition: opacity .3s ease;
}
.wf-enter {
  opacity: 0;
}
.item-move {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
}

/* end */
</style>

<template>
<div>
    <div class="lego"></div>
    <page-frame :page='"template"'>
      <div class="content" slot="main">
        <div>
          <waterfall :line-gap="450" :watch="tableData">
            <!-- each component is wrapped by a waterfall slot -->
            <waterfall-slot
              v-for="(item, index) in tableData"
              :width=generateRandomWidth()
              :height=generateRandomHeight()
              :order="index"
              :key="item.id"
            >
              <!--
                your component
              -->
              <div class="item" >
                <div v-for="ele in item.content" class="compontentBox" >
                    
                    <component  v-bind:is="ele.name" :itemData='ele' :source='"default"'></component>                   
                </div>
                <div class="addNew" @click="addNew(item._id,'add')">基于此模板创建</div>
              </div>
            </waterfall-slot>
          </waterfall>
          
        </div>
        <!-- <div class="add" @click="addlist">
          新建
        </div> -->
      </div>
    </page-frame>
</div>
</template>

<script>
import pageFrame from './../base/page-frame'
import equipmentInfo from '../../utils/equipmentInfo'
import Waterfall from 'vue-waterfall/lib/waterfall'
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'

import divimg from './../base/divimg'
import swiper from './../base/swiper'
import videoplay from './../base/videoplay'
import fixbottom from './../base/fixbottom'
import fixright from './../base/fixright'
import messagebox from '../base/messagebox'
import submit from './../base/submit'
import btn from './../base/btn'
import {
    mapState
} from 'vuex'
export default { 
  data() {
    return {
      tableData:'',
      align: 'center'
    };
  },

  methods: {
      formatter(row, column) {
        return row.address;
      },
      // addlist(){
      //   this.$router.push({
      //       name:"edit",
      //       params:{
      //         id:id,
      //         scene:scene
      //       }
      //     });
      //   }
      // },
      handleEdit(index, row){
        // this.$router.push({name:'/',params:{id:row._id}})
      },
      handleDelete(index, row) {
        // row 为当前整条数据
        console.log(index, row);
        this.$store.dispatch('data/deleteItem',{
          id:row._id
        }).then(() => {
          if(this.deleteResult.errCode === 0){
            this.$message({
                message: '删除成功',
                type: 'success'
            });
            setTimeout(() => {
              this.getList()
            },1000)
          }else{
            this.$message.error('删除失败');
          }

        })
      },
      getList(){
        this.$store.dispatch('data/getList').then(() => {
          this.tableData = this.dataList.result
        })        
      },
      generateRandomWidth(){
        let width =  100 + ~~(Math.random() * 50)
        return width
      },
      generateRandomHeight(){
        let height =  160 + ~~(Math.random() * 50)
        return height
      },
      addNew(id,scene){
        console.log(id)
        // this.$router.push({path:'/edit/'+id+'/'+scene})
        this.$router.push({
            name:"edit",
            params:{
              id:id,
              scene:scene
            }
          });
      }

  },
  components:{
      pageFrame,
      Waterfall,
      WaterfallSlot,
      divimg,
      swiper,
      videoplay,
      fixbottom,
      fixright,
      submit,
      messagebox,
      btn
  },
  computed:mapState({
      dataList: state => state.data.dataList,
      deleteResult: state => state.data.deleteResult
  }),
  mounted() {
    this.getList()
  }
};
</script>

<style scoped>
</style>
