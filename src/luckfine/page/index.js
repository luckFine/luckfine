import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from 'components/app.vue'
import data from 'stores/getdata'
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI);



import Foo from 'components/preview'
import Edit from 'components/page-edit'


const routes = [
    { 
      name:'Foo',
      path: '/Foo', 
      component: Foo },
    {
      name:'/',
      path: '/', 
      component: Edit 
    }
  ]

const router = new VueRouter({
    routes // short for `routes: routes`
  })

const store = new Vuex.Store({
    modules: {
        data
    }
  })

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
    render: (h) => h(App),
    store,
    router
}).$mount(root)