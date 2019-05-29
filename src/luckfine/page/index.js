import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from 'components/app.vue'
import data from 'stores/getdata'
import compontentList from 'stores/compontentList'
import login  from 'stores/login'
import config from 'stores/config';

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI);



import preview from 'components/page/preview'
import webEdit from 'components/page/page-edit-web'
import appEdit from 'components/page/page-edit-app'
import log from 'components/page/login'
import list from 'components/page/page-list'
import template from 'components/page/page-template-list'


const routes = [
    { 
      name:'preview',
      path: '/preview', 
      component: preview },
    {
      name:'edit',
      path: '/edit', 
      component: webEdit 
    },
    {
      name:'/app',
      path: '/app', 
      component: appEdit 
    },
    {
      name:'/list',
      path: '/list', 
      component: list 
    },
    {
      name:'/template',
      path: '/template', 
      component: template 
    },
    {
      name:'/log',
      path: '/log', 
      component: log
    },
  ]

const router = new VueRouter({
    routes // short for `routes: routes`
  })

const store = new Vuex.Store({
    modules: {
        data,
        login,
        config,
        compontentList
    }
  })

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App),
    store,
    router
}).$mount(root)