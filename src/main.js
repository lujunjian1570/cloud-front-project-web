import Vue from 'vue'
import App from './App.vue'
import { initRouter } from './router'
import './theme/index.less'
import Antd from 'ant-design-vue'
import VueLazyload from 'vue-lazyload'
import VueCropper from 'vue-cropper'

// import Viser from 'viser-vue'
// import '@/mock'
import store from './store'
import 'animate.css/source/animate.css'
import Plugins from '@/plugins'
import { initI18n } from '@/utils/i18n'
import bootstrap from '@/bootstrap'
import Api from '@/services/api'
import Http from '@/services/http'
import Sec from '@/utils/security'
import { fn } from '@/utils/common'
import '@/utils/filter' // base filter

const router = initRouter(store.state.setting.asyncRoutes)
const i18n = initI18n('CN', 'US')

Vue.use(Antd)
Vue.use(VueCropper)
Vue.config.productionTip = false
// Vue.use(Viser)
Vue.use(Plugins)
// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/img/logo.png'),
  loading: require('./assets/img/logo.png'),
  attempt: 1
})

bootstrap({ router, store, i18n, message: Vue.prototype.$message })

Vue.prototype.$Api = Api
Vue.prototype.$Http = Http
Vue.prototype.$Sec = Sec
Vue.prototype.$Common = fn

Vue.prototype.$message.config({
  top: '45%',
  duration: 2,
  maxCount: 3
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
