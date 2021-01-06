import Vue from 'vue'
import { request, METHOD } from '@/utils/request'

export default {
  // post传参（json）
  postAction(url, parameter) {
    return request(url, METHOD.POST, parameter)
  },
  // get传参（json）
  getAction(url, parameter) {
    return request(url, METHOD.GET, parameter)
  },
  // postSEC传参（json）
  postSecAction(url, parameter) {
    const paramModel = {
      y : Vue.prototype.$Sec.encrypt(JSON.stringify(parameter))
    }
    return request(url, METHOD.POST, paramModel)
  },
  // getSEC传参（json）
  getSecAction(url, parameter) {
    const paramModel = {
      y : Vue.prototype.$Sec.encrypt(JSON.stringify(parameter))
    }
    return request(url, METHOD.GET, paramModel)
  },
  // post传参（formdata）
  postFormData(url, parameter) {
    return request(url, METHOD.POST, this.formDataParam(parameter))
  },
  // get传参（formdata）
  getFormData(url, parameter) {
    return request(url, METHOD.get, this.formDataParam(parameter))
  },
  // 转formdata
  formDataParam(data) {
    const form = new FormData()
    const keys = Object.keys(data)
    keys.forEach(key => {
      form.append(key, data[key])
    })
    return form
  }
}
/* export async function postAction(url, parameter) {
  return request(url, METHOD.POST, parameter)
}*/

