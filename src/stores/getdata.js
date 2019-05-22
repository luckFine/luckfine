/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

import $ from 'jquery'
export default {
  namespaced: true,
  state: {
    // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更新
    dataList: [],
    savePage:''
  },
  mutations: {
    setData(state, res) {
      state.dataList = res;
    },
    savePage(state, res) {
      state.savePage = res;
    },
  },
  // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    getList({
      commit,
      rootState,
      state
    }, options) {
      return $.ajax({
        url: '/actconf/api/activity/list',
        dataType: 'json'
      }).then(data => {
          commit('setData', data)
      })
    },
    savePages({
      commit,
      rootState,
      state
    }, page) {
      return $.ajax({
        url: '/actconf/api/activity/create',
        type:'post',
        data:page,
        dataType: 'json'
      }).then(data => {
          console.log(options.entity)
          commit('savePage', data)
      })
    }
  }
}