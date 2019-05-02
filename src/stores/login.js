import $ from 'jquery';

export default {
  namespaced: true,
  state: {
    loginData: {}
  },
  mutations: {
    setLoginData(state, data) {
      if (data.code) {
        state.loginData = data;
      } else {
        localStorage.setItem('user_token', data.sessionToken);
        state.loginData = data;
      }
    }
  },
  actions: {
    login({ commit, rootState }, { username, password }) {
      let url = `${rootState.config.API_URL}/admins/login`;
      console.log(url)
      return $.ajax({
        url,
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        data: JSON.stringify({
          username,
          password
        })
      }).then(res => {
        commit('setLoginData', res);
      });
    },
    logout({ commit, rootState }) {
      let url = `${rootState.config.API_URL}/admins/logout`;
      return $.ajax({
        url,
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-jrj-session-token': localStorage.getItem('_lego_token')
        }
      });
    },
    getUserInfo({ commit, rootState }) {
      let url = `${rootState.config.API_URL}/admins/me`;
      return $.ajax({
        url,
        headers: {
          'content-type': 'application/json',
          'x-jrj-session-token': localStorage.getItem('_lego_token')
        }
      });
    }
  }
};
