import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import home from '@/components/home'
Vue.use(Router)
const router = new Router({
  mode:"history",
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      meta: 'logon',
      component: HelloWorld
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path:'/home',
      name:'home',
      meta:'logon',
      component:home
    }
  ]
})
router.beforeEach((to,from,next)=>{
  if(to.meta==='logon') {
    if(localStorage.getItem("author")) {
      next()
    } else {
      next('login')
    }
  }
})
export default router
