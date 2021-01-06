import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'
// import PageView from '@/layouts/PageView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404')
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403')
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/index',
      children: [
        {
          path: 'index',
          name: '首页',
          meta: {
            icon: 'home'
          },
          component: () => import('@/pages/skin')
        },
        {
          path: 'setting',
          name: '系统设置',
          meta: {
            icon: 'setting'
          },
          component: BlankView,
          redirect: '/setting/skin',
          children: [
            {
              path: 'skin',
              name: '换肤设置',
              component: () => import('@/pages/skin')
            },
            {
              path: 'editSkin',
              name: '新增/编辑',
              meta: {
                invisible: true
              },
              component: () => import('@/pages/skin/editSkin')
            },
            {
              path: 'banner',
              name: '轮播图管理',
              component: () => import('@/pages/banner')
            },
            // {
            //   path: 'advert',
            //   name: '广告位',
            //   component: () => import('@/pages/advert'),
            // },
            {
              path: 'version',
              name: '版本管理',
              component: () => import('@/pages/versionManagement')
            }
          ]
        },
        {
          path: 'dev',
          name: '开发者中心',
          meta: {
            icon: 'cloud'
          },
          component: BlankView,
          redirect: '/dev/task',
          children: [
            {
              path: 'task',
              name: '定时任务',
              component: () => import('@/pages/demo')
            },
            {
              path: 'auditLog',
              name: '审计日志',
              component: () => import('@/pages/demo')
            }
          ]
        }

      ]
    }
  ]
}

export default options
