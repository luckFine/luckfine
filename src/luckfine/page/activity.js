import Vue from 'vue'
import Vuex from 'vuex'
// import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from 'components/app.vue'
import data from 'stores/getdata'
import compontentList from 'stores/compontentList'
import config from 'stores/config';

Vue.use(Vuex)
Vue.use(VueRouter)

import activity from 'components/page/activity.vue'



const routes = [
    {
        path:'/:id',
        name:'activity',
        component:activity
    }
  ]

const router = new VueRouter({
    routes // short for `routes: routes`
})

const store = new Vuex.Store({
    modules: {
        data,
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