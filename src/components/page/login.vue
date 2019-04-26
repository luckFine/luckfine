<template>
<div class="loginBox">
  <div class="wrapper-page">
    <div class="text-center">
      <a href="index.html" class="logo"><span>可视化<span>配置</span></span></a>
    </div>
    <div class="m-t-40 card-box">
      <div class="text-center">
        <h4 class="text-uppercase font-bold m-b-0">登录</h4>
      </div>
      <div class="p-20">
        <form id="loginForm" class="form-horizontal m-t-20" action="create" >

          <div class="form-group">
            <div class="col-xs-12">
              <input ref="username" class="form-control" type="text" required="" placeholder="用户名">
            </div>
          </div>

          <div class="form-group">
            <div class="col-xs-12">
              <input ref="password" class="form-control" type="password" required="" placeholder="密码">
            </div>
          </div>

          <div class="form-group text-center">
            <div class="col-xs-12">
              <button class="btn btn-custom btn-bordred btn-block waves-effect waves-light" type="submit">登录</button>
            </div>
          </div>

        </form>

      </div>
    </div>
    <!-- end card-box-->

  </div>
</div>
</template>

<script>


export default {
  name: 'login.vue',
  data() {
    return {};
  },

  methods: {

  },
  mounted() {}
};
</script>

<style scoped>
</style>
