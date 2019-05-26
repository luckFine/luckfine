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
    deleteResult:''
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
    }
  },
  // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    getList({
      commit,
      rootState,
      state
    }, options) {
      return axios.get('/actconf/api/activity/list').then(() => {
        commit('setData', data)
      })
      
      // $.ajax({
      //   url: '/actconf/api/activity/list',
      //   dataType: 'json'
      // }).then(data => {
          
      // })
    },
    savePages({
      commit,
      rootState,
      state
    }, options) {
      return $.ajax({
        url: '/actconf/api/activity/save',
        type:'post',
        data:{
          content:options.content,
          wholePage:options.wholePage,
          _id:options._id
        },
        dataType: 'json'
      }).then(data => {
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
      return $.ajax({
        url: '/actconf/api/activity/remove/'+options.id,
        dataType: 'json'
      }).then(data => {
          console.log(data)
          commit('deleteResult', data)
      })
    },
  }
}