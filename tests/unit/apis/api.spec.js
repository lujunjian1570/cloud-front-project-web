const request = require('supertest')
// const BASE_URL = 'http://192.168.1.235:7072'
const BASE_URL = process.env.VUE_APP_API_BASE_URL

describe('后台应用接口测试', () => {
  it('登录接口 /admin-web-api/login/login.do', (done) => {
    request(BASE_URL)
      .post('/admin-web-api/login/login.do')
      .set('Content-Type', 'application/json') // set header内容
      .send({ // send body内容
        username: 'admin',
        password: 123456
      })
      .expect(200) // 断言希望得到返回http状态码
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        // console.log(res.body)
        expect(res.body.msgCode).toEqual('10000')
        expect(res.body.result).toHaveProperty('accessToken')
        expect(res.body.result).toHaveProperty('tokenType')
        expect(res.body.result).toHaveProperty('refreshToken')
        done()
      })
  })
  it('应用管理列表 /admin-web-api/application/getList.do', (done) => {
    request(BASE_URL)
      .post('/admin-web-api/application/getList.do')
      .set('Content-Type', 'application/json') // set header内容
      .send({})
      .expect(200) // 断言希望得到返回http状态码
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        expect(res.body.msgCode).toEqual('10000')
        if (res.body.result.length) {
          expect(res.body.result[0]).toHaveProperty('appList')
          expect(res.body.result[0]).toHaveProperty('appType')
          expect(res.body.result[0]).toHaveProperty('appTypeName')
        }
        done()
      })
  })
  it('获取皮肤列表 /admin-web-api/theme/getThemeList.do', (done) => {
    request(BASE_URL)
      .post('/admin-web-api/theme/getThemeList.do')
      .set('Content-Type', 'application/json') // set header内容
      .send({
        appId: 1,
        pageNo: 1,
        pageSize: 12
      })
      .expect(200) // 断言希望得到返回http状态码
      .end((err, res) => {
        if (err) {
          console.log(err)
        }
        // console.log(res.body.result)
        expect(res.body.msgCode).toEqual('10000')
        expect(res.body.result).toHaveProperty('records')
        expect(res.body.result).toHaveProperty('total')
        if (res.body.result.records.length) {
          expect(res.body.result.records[0]).toHaveProperty('id')
          expect(res.body.result.records[0]).toHaveProperty('endTime')
          expect(res.body.result.records[0]).toHaveProperty('hasDefault')
          expect(res.body.result.records[0]).toHaveProperty('navbarBackgroundColor')
          expect(res.body.result.records[0]).toHaveProperty('navbarColor')
          expect(res.body.result.records[0]).toHaveProperty('startTime')
          expect(res.body.result.records[0]).toHaveProperty('tabbarBackgroundColor')
          expect(res.body.result.records[0]).toHaveProperty('tabbarColor')
          expect(res.body.result.records[0]).toHaveProperty('tabbarSelectColor')
          expect(res.body.result.records[0]).toHaveProperty('themeName')
          expect(res.body.result.records[0]).toHaveProperty('themeType')
          expect(res.body.result.records[0]).toHaveProperty('useStatus')
          expect(res.body.result.records[0]).toHaveProperty('viewPicUrl')
          expect(res.body.result.records[0]).toHaveProperty('viewPic')
        }
        done()
      })
  })
})
