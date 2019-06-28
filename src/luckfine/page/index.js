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
import appEdit from 'components/page/page-list-app'
import editapp from 'components/page/page-edit-app'
import log from 'components/page/login'
import list from 'components/page/page-list'
import template from 'components/page/page-template-list'
import analysis from 'components/page/page-analysis'
import activityWeb from 'components/page/activity'
import local from 'components/page/local'


const routes = [
    { 
      name:'preview',
      path: '/preview/:id', 
      component: preview },
    {
      name:'edit',
      path: '/edit/:id', 
      component: webEdit 
    },
    {
      name:'editapp',
      path: '/edit/:id', 
      component: editapp 
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
      name:'/analysis',
      path: '/analysis', 
      component: analysis
    },
    {
      name:'/local',
      path: '/local', 
      component: local
    },
    {
      name:'/activity',
      path: '/activity/:id', 
      component: activityWeb
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