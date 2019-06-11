/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

import $ from 'jquery'
import axios from 'axios'
export default {
  namespaced: true,
  state: {
    // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更新
    dataList: [],
    savePageResult:'',
    morePicArr:[],
    pageDetailData:'',
    deleteResult:'',
    activiyItem:'',
    activiyIndex:''
  },
  mutations: {
    setData(state, res) {
      state.dataList = res;
    },
    savePage(state, res) {
      state.savePage = res;
    },
    setMorePicArr(state, res) {
      state.morePicArr = res;
    },
    pageDetail(state, res) {
      state.pageDetailData = res;
    },
    deleteResult(state, res) {
      state.deleteResult = res;
    },
    updateData(state,res){
      let itemIndex;
      state.dataList.result.some((item,index) => {
        if(item._id === res._id){
          itemIndex = index;
          return true;
        }
      })
      if(itemIndex!==undefined){
        state.dataList.result.splice(itemIndex,1,res);
      }
    },
    setactiviyItem(state,res){
      state.activiyItem = res
    },
    setactiviyIndex(state,res){
      state.setactiviyIndex = res
    }
  },
  // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    getList({
      commit,
      rootState,
      state
    }, options) {
      return axios.get('/actconf/api/activity/list').then((data) => {
        commit('setData', data.data)
      })
    },
    savePages({
      commit,
      rootState,
      state
    }, options) {
      return axios.post('/actconf/api/activity/save',{
          content:options.content,
          wholePage:options.wholePage,
          _id:options._id     
      }).then((data) => {
        commit('savePage', data)
      })
    },
    pageDetail({
      commit,
      rootState,
      state
    }, options) {
      return $.ajax({
        url: '/actconf/api/activity/detail/'+options.id,
        dataType: 'json'
      }).then(data => {
          commit('pageDetail', data)
      })
    },
    deleteItem({
      commit,
      rootState,
      state
    }, options) {
      return axios.delete('/actconf/api/activity/remove/'+options.id).then((data) => {
        commit('deleteResult', data.data)
      })
    },
    publish({commit},{id,status}){
      return axios.post('/actconf/api/activity/publish',{
        _id:id,
        status
      }).then((d) => {
        const data = d.data;
        if(data.errCode === 0){
          const entity = data.result;
          commit('updateData',entity);
        }
      })
    }
  }
}