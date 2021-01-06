// 视图组件
const view = {
  tabs: () => import('@/layouts/tabs'),
  blank: () => import('@/layouts/BlankView'),
  page: () => import('@/layouts/PageView')
}

// 路由组件注册
const routerMap = {
  login: {
    authority: '*',
    path: '/login',
    component: () => import('@/pages/login')
  },
  demo: {
    name: '演示页',
    renderMenu: false,
    component: () => import('@/pages/demo')
  },
  task: {
    name: '任务中心',
    renderMenu: false,
    component: () => import('@/pages/demo')
  },
  exp403: {
    authority: '*',
    name: 'exp403',
    path: '403',
    component: () => import('@/pages/exception/403')
  },
  exp404: {
    name: 'exp404',
    path: '404',
    component: () => import('@/pages/exception/404')
  },
  exp500: {
    name: 'exp500',
    path: '500',
    component: () => import('@/pages/exception/500')
  },
  root: {
    path: '/',
    name: '首页',
    redirect: 'login',
    component: view.tabs
  },
  parent1: {
    name: '父级路由1',
    icon: 'info-circle',
    component: view.blank
  },
  parent2: {
    name: '父级路由2',
    icon: 'info-circle',
    component: view.page
  },
  exception: {
    name: '异常页',
    icon: 'info-circle',
    component: view.blank
  },
  task1: {
    name: '任务管理',
    icon: 'info-circle',
    component: view.blank
  },
  task2: {
    name: '调试日志',
    icon: 'info-circle',
    component: view.page
  },
  task3: {
    name: '执行器管理',
    icon: 'info-circle',
    component: view.blank
  },
  task4: {
    name: '父级路由2',
    icon: 'info-circle',
    component: view.page
  },

  index: {
    component: () => import('@/pages/skin')
  },
  setting: {
    component: view.blank
  },
  skin: {
    meta:{
      icon: 'info-circle',
      page:{
        // 是否缓存该页面
        cacheAble: false
      }
    },
    component: () => import('@/pages/skin')
  },
  editSkin: {
    // 是否不将此路由项渲染为菜单项
    invisible: true,
    icon: 'info-circle',
    component: () => import('@/pages/skin/editSkin')
  },
  banner: {
    icon: 'info-circle',
    component: () => import('@/pages/banner')
  },
  version: {
    icon: 'info-circle',
    component: () => import('@/pages/versionManagement')
  }
}
export default routerMap
