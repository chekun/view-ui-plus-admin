import Main from '@/components/main'

export default () => {
  return {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'md-settings',
      title: '系统管理',
      showAlways: true,
    },
    component: Main,
    children: [
      {
        path: 'password',
        name: 'system_password',
        level: 1,
        meta: {
          title: '密码修改',
          notCache: true,
          icon: 'md-key'
        },
        component: () => import('@/view/system/password')
      }
    ]
  }
}
