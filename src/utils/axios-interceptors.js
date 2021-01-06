import Vue from 'vue'
import Cookie from 'js-cookie'
// 401拦截
const resp401 = {
  /**
   * 响应数据之前做点什么
   * @param response 响应对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(response, options) {
    const { message } = options
    if (response.code === 401) {
      message.error('无此权限')
    }
    return response
  },
  /**
   * 响应出错时执行
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options
    const { response } = error
    if (response.status === 401) {
      message.error('无此权限')
    }
    return Promise.reject(error)
  }
}

const resp403 = {
  onFulfilled(response, options) {
    const { message } = options
    if (response.code === 403) {
      message.error('请求被拒绝')
    }
    return response
  },
  onRejected(error, options) {
    const { message } = options
    const { response } = error
    if (response.status === 403) {
      message.error('请求被拒绝')
    }
    return Promise.reject(error)
  }
}

const resp200 = {
  onFulfilled(response, options) {
    const { message } = options
    if (response.status === 200) {
      // 判断返回的数据是否是对象
      response.data = Object.prototype.toString.call(response.data) === '[object Object]' ? response.data : JSON.parse(Vue.prototype.$Sec.decrypt(response.data))
      const msgCode = response.data.msgCode
      const msgInfo = response.data.msgInfo
      switch (msgCode) {
        /* 10000:接口调用成功!
        20000:服务不可用!
        20001:授权权限不足!
        40001:缺少必选参数!
        40002:非法的参数!
        40004:业务处理失败!
        40006:权限不足!
        40007:token错误!*/
        case Vue.prototype.$Common.sucCode:
          break
        case '20000':
          message.error(msgInfo)
          break
        case '20001':
          message.error(msgInfo)
          break
        case '40001':
          message.error(msgInfo)
          break
        case '40002':
          message.error(msgInfo)
          break
        case '40004':
          message.error(msgInfo)
          break
        case '40006':
          message.error(msgInfo)
          break
        case '40007':
          message.error(msgInfo)
          break
        default:
          message.error(msgInfo)
      }
    }
    return response.data
  }
}

const reqCommon = {
  /**
   * 发送请求之前做些什么
   * @param config axios config
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {*}
   */
  onFulfilled(config, options) {
    const { message } = options
    const { url, xsrfCookieName } = config
    if (url.indexOf('login') === -1 && xsrfCookieName && !Cookie.get(xsrfCookieName)) {
      message.warning('认证 token 已过期，请重新登录')
    }
    config.headers = Object.assign({}, config.headers, Vue.prototype.$Sec.apiSign(config.data))
    return config
  },
  /**
   * 请求出错时做点什么
   * @param error 错误对象
   * @param options 应用配置 包含: {router, i18n, store, message}
   * @returns {Promise<never>}
   */
  onRejected(error, options) {
    const { message } = options
    message.error(error.message)
    return Promise.reject(error)
  }
}

export default {
  request: [reqCommon], // 请求拦截
  response: [resp200, resp401, resp403] // 响应拦截
}
