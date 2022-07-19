import Main from '@/components/main'

import systemRoutes from './routes/system'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export const homeRoute = {
  path: '/',
  name: '_dashboard',
  redirect: '/dashboard',
  component: Main,
  meta: {
    notCache: true
  },
  children: [
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        hideInMenu: false,
        title: '首页',
        notCache: true,
        icon: 'md-home'
      },
      component: () => import('@/view/home/home.vue')
    }
  ]
}

export const baseRoutes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: '登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  /* {
    path: '/agent/token/authorize',
    name: 'agent_token_authorize',
    component: () => import('@/view/agent/token/authorize.vue'),
    meta: {
      hideInMenu: true
    }
  }, */
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-pages/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-pages/500.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-pages/404.vue')
  },
]

const getRoutes = () => {
  const dynamicRouters = baseRoutes.concat([
    homeRoute,
    systemRoutes()
  ])

  return dynamicRouters
}

export default getRoutes
