import * as api from '@/services/api'
import { request, METHOD, removeAuthorization } from '@/utils/request'

/**
 * 登录服务
 * @param name 账户名
 * @param password 账户密码
 * @returns {Promise<AxiosResponse<T>>}
 */
export async function login(name, password) {
  return await request(api.LOGIN, METHOD.POST, {
    name: name,
    password: password
  })
}

export async function getRoutesConfig() {
  return await request(api.ROUTES, METHOD.GET)
}
// 图片上传接口
export async function uploadFileImg(params) {
  return await request(api.uploadFileImg, METHOD.POST, params)
}

/**
 * 退出登录
 */
export function logout() {
  localStorage.removeItem(process.env.VUE_APP_ROUTES_KEY)
  localStorage.removeItem(process.env.VUE_APP_PERMISSIONS_KEY)
  localStorage.removeItem(process.env.VUE_APP_ROLES_KEY)
  removeAuthorization()
}
export default {
  login,
  logout,
  getRoutesConfig,
  uploadFileImg
}
