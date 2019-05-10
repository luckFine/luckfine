/*
 * 同步形式的store，设置好state中的值即可
 * namespaced为true，是为了避免store的module之间，getters、mutations、actions发生命名冲突
 */

import axios from 'axios'
export default {
  namespaced: true,
  state: {
    // 初始化时，务必要把所有的数据成员做初始化，否则后面数据的更新，将不会触发显示的更新
    comlist: '',
    stylelist:''
  },
  mutations: {
    conlist(state, res) {
      state.comlist = res;
    },
    styleList(state, res) {
      state.stylelist = res;
    }
  },
  // 浏览器环境才可以使用actions来获取数据，服务端应该用Node.js的方式获取数据后，通过mutations同步的把数据存入到store
  actions: {
    getCompontentList({
      commit,
      rootState,
      state
    }, options) {
    
      return axios.get('/user/userInfo').then((res) => {
            // console.log(res)
            const d = res.data;
            // if(d.retCode === 0){
            commit('conlist',d.data);
            // }
        })
    },
    getStyleList({
      commit,
      rootState,
      state
    }, options) {
    
      return axios.get('/magiCube/styleList').then((res) => {
            // console.log(res)
            const d = res.data;
            // if(d.retCode === 0){
            commit('styleList',d.data);
            // }
        })
    }
  }
}