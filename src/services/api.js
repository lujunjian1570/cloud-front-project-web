// 跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
// const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
  signVerify: '/admin-web-api/signVerify/json.do', // 验证接口签名JSON格式
  formSignVerify: '/admin-web-api/signVerify/form.do', // 验证接口签名FormData格式
  saveCertificate: '/admin-web-api/certificate/save.do', // 测试保存富文本
  getCertificateList: '/admin-web-api/certificate/getByPage.do', // 获取富文本列表
  getCertificateDetail: '/admin-web-api/certificate/getDetail.do', // 获取富文本详情
  updateCertificate: '/admin-web-api/certificate/update.do', // 测试修改富文本信息
  login: '/admin-web-api/login/login.do', // 登录
  encryptTest: '/admin-web-api/appVersion/getMonthStatistic.do', // 获取版本更新时间(加密测试)
  logout: '/admin-web-api/login/logout.do', // 退出
  checkToken: '/admin-web-api/oauth/checkToken.do', // 检查token
  routes: '/routes', // 路由
  uploadFileImg: '/admin-web-api/sysFile/uploadFileImg.do', // 上传图片
  uploadFile: '/admin-web-api/sysFile/uploadFile.do', // 上传文件
  getAppList: '/admin-web-api/application/getList.do', // 获取应用管理列表
  getThemeList: '/admin-web-api/theme/getThemeList.do', // 获取主题列表,
  getThemeType: '/admin-web-api/theme/getThemeType.do', // 获取皮肤类型,
  getThemeDetail: '/admin-web-api/theme/getThemeDetail.do', // 获取主题详情
  addTheme: '/admin-web-api/theme/save.do', // 新增、编辑主题
  setThemeIsUsed: '/admin-web-api/theme/setThemeIsUsed.do', // 立即启用此主题
  useDefaultTheme: '/admin-web-api/theme/useDefaultTheme.do', // 恢复默认主题
  delTheme: '/admin-web-api/theme/delete.do', // 删除主题
  getAppUpdateList: '/admin-web-api/appVersion/getPageList.do', // 版本更新 列表
  getAppUpdateDetail: '/admin-web-api/appVersion/get.do', // 版本更新 根据id获取详细信息
  deleteAppUpdate: '/admin-web-api/appVersion/delete.do', // 版本更新 根据id删除版本信息
  saveAppUpdate: '/admin-web-api/appVersion/save.do', // 版本更新 保存/编辑版本信息
  getBannerList: '/admin-web-api/banner/getBannerList.do', // Banner轮播图列表查询
  getBannerDetail: '/admin-web-api/banner/getBanner.do', // 获取banner轮播图详情
  saveBanner: '/admin-web-api/banner/save.do', // 新增、编辑banner轮播图
  delBanner: '/admin-web-api/banner/delete.do', // 删除banner轮播图
  enablePic: '/admin-web-api/banner/enablePic.do', // 启用banner轮播图
  disablePic: '/admin-web-api/banner/disablePic.do', // 禁用banner轮播图
  getBannerLocation: '/admin-web-api/banner/getBannerLocation.do', // 查询banner轮播图位置列表
  getIndicatorMode: '/admin-web-api/banner/getIndicatorMode.do', // 查询banner轮播图查询指引样式
  getIndicatorPos: '/admin-web-api/banner/getIndicatorPos.do' // 查询banner轮播图位置样式
}
