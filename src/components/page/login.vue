
<style scoped>
.proName{
  font-size: 40px;
  text-align: center;
  margin-top: 140px;
}
.proName span{
  /* color:  */
}
.loginBox{
  width: 100%;
  height: 100%;
  background: url('../../assets/img/bg.jpg') center 0 no-repeat;
  overflow: hidden;
  background-size: 100% auto;
  position: relative;
}
.wrapper-page{
  background-color:rgba(53,41,43,.5);
  border:1px solid #bdbdbd;
  position:absolute;
  top:30%;
  width:382px;
  left: 50%;
  margin-left: -191px;
  padding-bottom: 70px;
}
.list{
  margin: 15px auto;
  width:318px;
}
.listinp{
  background:rgba(31,27,24,.7);
  border:1px solid #999;
  color:#fff;
  font-size:14px;
  height:38px;
  padding:0 10px;
  width:298px;
}
.login{
  height: 40px;
  width: 320px;
  margin: 0 auto;
  margin-top: 40px;
}
.btn{
  background:#078be4;
  border:0px;
  color: #fff;
  font-family:Microsoft YaHei;
  font-size:14px;
  line-height: 30px;;
  height: 40px;
  width: 320px;
}
.text-uppercase{
  color: #fff;
  text-align: center;
  line-height: 80px;
  height: 80px;;
}
.error{
  text-align: center
}
</style>

<template>
<div class="loginBox">
  <div class="proName">
      <span>可视化配置</span>平台
  </div>
  <div class="wrapper-page">
    <div class="m-t-40 card-box">
      <div class="text-center">
        <h4 class="text-uppercase">登录</h4>
      </div>
      <div class="p-20">
        <form id="loginForm" class="form-horizontal m-t-20" action="create"  @submit.prevent="loginUser">

          <div class="list" id="username">
              <input ref="username" class="listinp" type="text" required="" placeholder="用户名">
          </div>

          <div class="list">
              <input ref="password" class="listinp" type="password" required="" placeholder="密码">
          </div>

          <div class="login">
              <input class="btn" type="submit" value="登录">
          </div>

          <div class="list" v-if="loginData && loginData.error">
            <div class="error" style="color:red;">{{loginData && loginData.error}}</div>
          </div>

        </form>

      </div>
    </div>
    <!-- end card-box-->

  </div>
</div>
</template>

<script>
import {
    mapState
} from 'vuex'

export default {
  name: 'login.vue',
  data() {
    return {};
  },
  computed:
    mapState({
      loginData: state => state.login.loginData
    }),
  methods: {
    loginUser() {
      // if (this.$refs.username.value && this.$refs.password.value) {
      console.log(this.$store)
      this.$store
        .dispatch('login/login', {
          username: this.$refs.username.value,
          password: this.$refs.password.value
        })
        .then(() => {
          if (!this.$store.state.login.loginData.code) {
            localStorage.setItem(
              '_lego_token',
              this.$store.state.login.loginData.sessionToken
            );
            localStorage.setItem(
              '_lego_nickname',
              this.$store.state.login.loginData.nickname ||
                this.$store.state.login.loginData.username
            );
            this.$router.push({
              path: '/list'
            });
          }
        });
      }
  },
  mounted() {}
};
</script>
