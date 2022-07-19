import { createRouter, createWebHistory } from 'vue-router'
import ViewUIPlus from 'view-ui-plus'
import getRoutes from './routers'
import store from '@/store'
import { setToken, getToken, canTurnTo } from '@/libs/util'
import config from '@/config'
const { homeName } = config

let routes = getRoutes()

const router = createRouter({
  routes,
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  }
})

const LOGIN_PAGE_NAME = 'login'

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next() // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
}

router.beforeEach((to, from, next) => {
  ViewUIPlus.LoadingBar.start()
  const token = getToken()

  if (to.name === 'register' || to.name === 'activate' || to.name === 'reset_password') {
    next()
    return
  }

  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  } else if (token && to.name === 'error_404') { // 刷新浏览器操作
    return next() // 直接跳到404
  } else if (to.name === 'error_404') {
    return next()
  } else {
    if (store.state.user.hasGetInfo) {
      turnTo(to, store.state.user.access, next)
    } else {
      store.dispatch('getUserInfo').then(user => {
        return new Promise((resolve, reject) => {
          // 更新路由
          // const userRoutes = getRoutes()
          // router.addRoutes(userRoutes)
          // routes = routes.concat(userRoutes)
          resolve(user)
        })
      }).then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        turnTo(to, store.state.user.access, next)
      }).catch((e) => {
        setToken('')
        next({
          name: 'login'
        })
      })
    }
  }
})

router.afterEach(to => {
  ViewUIPlus.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
