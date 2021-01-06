import CryptoJS from 'crypto-js'

// ECB模式
export default {
  // 加密
  encrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'CFSq8I#IoKa8Fz09erTeZEBc'
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let srcs = CryptoJS.enc.Utf8.parse(word)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return encrypted.toString()
  },
  // 解密
  decrypt(word, keyStr) {
    keyStr = keyStr ? keyStr : 'CFSq8I#IoKa8Fz09erTeZEBc'
    let key = CryptoJS.enc.Utf8.parse(keyStr)
    let decrypt = CryptoJS.AES.decrypt(word, key, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
  },
  // 接口签名
  apiSign(params) {
    let str = '', // 参数
      timestamp = new Date().getTime().toString(), // 时间戳
      appKey = 'cloud-admin-web', // appKey
      appSecret = 'cT460FwaZ67Dkc4gRvh2fMJG', // appSecret
      sign = '' // sign
    // 请求是json格式
    if (Object.prototype.toString.call(params) === '[object Object]') {
      str = JSON.stringify(params)
    } else {
      // 请求是formdata格式
      for(const key of params) {
        str += key.join('=') + '&'
      }
      str = (str.substr(0, str.length - 1)).split('&').sort().join('&')
    }
    sign = CryptoJS.MD5(str + timestamp + appSecret).toString()
    return {
      timestamp: timestamp,
      appKey: appKey,
      sign: sign
    }
  }
}
