import Vue from 'vue'
export const fn = {
  /* 后台接口成功返回码*/
  sucCode: '10000',
  // 获取图片Base64
  getBase64: function(img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  },
  // 上传之前文件类型判断，大小尺寸判断
  beforeUpload(file, fileTypes, fileMaxSize) {
    const types = fileTypes,
      fileType = types.includes(file.type)
    if (!fileType) {
      Vue.prototype.$message.error('上传文件格式有问题!')
      return false
    }

    const isMaxSize = file.size / 1024 / 1024 < fileMaxSize
    if (!isMaxSize) {
      Vue.prototype.$message.error('请上传小于' + fileMaxSize + 'MB的图片')
      return false
    }

    return fileType && isMaxSize
  },
  // 删除所有标签
  delHtmlTag: function(str) {
    return str.replace(/<[^>]+>/g, '')
  },
  // 取消行内样式
  replaceStr: function(str) {
    // eslint-disable-next-line no-useless-escape
    return str = str.replace(/style\=".+?"|style\=\'.+?\'/g, '')
  },
  // 获取数组中相同元素的个数
  getSameNum: function(val, arr) {
    let processArr = arr.filter(function(value) {
      return value == val
    })
    return processArr.length
  },
  // 三位数字加个‘，’
  formatNumber: function(n) {
    let b = parseInt(n).toString(),
      len = b.length
    if (len <= 3) {
      return b
    }
    let r = len % 3
    return r > 0 ? b.slice(0, r) + ',' + b.slice(r, len).match(/\d{3}/g).join(',') : b.slice(r, len).match(/\d{3}/g).join(',')
  },
  // 三位数字加个‘，’，尾数保留两位小数
  formatFixNumber: function(number, decimals, decPoint, thousandsSep) {
    /*
     * 参数说明：
     * number：要格式化的数字
     * decimals：保留几位小数
     * decPoint：小数点符号
     * thousandsSep：千分位符号
     *
     */

    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
      sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep,
      dec = (typeof decPoint === 'undefined') ? '.' : decPoint,
      s = '',
      toFixedFix = function(n, prec) {
        let k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
      }

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  },

  // 数组去重
  uniqArrs: function(array) {
    let temp = [] // 一个新的临时数组
    for (let i = 0; i < array.length; i++) {
      if (temp.indexOf(array[i]) == -1) {
        temp.push(array[i])
      }
    }
    return temp
  },

  // 判断两个数组相同的元素
  getArrEqual: function(arr1, arr2) {
    let newArr = []
    for (let i = 0; i < arr2.length; i++) {
      for (let j = 0; j < arr1.length; j++) {
        if (arr1[j] === arr2[i]) {
          newArr.push(arr1[j])
        }
      }
    }
    return newArr
  },

  // 判断两个数组不同的元素
  getArrDifference: function(arr1, arr2) {
    return arr1.concat(arr2).filter(function(v, i, arr) {
      return arr.indexOf(v) === arr.lastIndexOf(v)
    })
  },

  // 判断一个数组中包含另一个数组
  isContained: function(aa, bb) {
    if (!(aa instanceof Array) || !(bb instanceof Array) || ((aa.length < bb.length))) {
      return false
    }
    for (let i = 0; i < bb.length; i++) {
      let flag = false
      for (let j = 0; j < aa.length; j++) {
        if (aa[j] == bb[i]) {
          flag = true
          break
        }
      }
      if (flag == false) {
        return flag
      }
    }
    return true
  },

  // 数组单个字段排序
  sortBy(field) {
    return function(a, b) {
      return a[field] - b[field]
    }
  },
  // 正则判断大全
  testRule: {

    // 邮箱正则判断
    isEmail: function(str) {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      return reg.test(str)
    },

    // 判断是否有汉字
    isWord: function(str) {
      let reg = /[\W]/
      return reg.test(str)
    },

    // 手机号正则判断
    isTel: function(str) {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
      return reg.test(str)
    },

    // 身份证正则判断
    isCard: function(str) {
      let reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      return reg.test(str)
    },

    // 只能输入数字正则判断
    isNum: function(str) {
      let reg = /^\d+$/
      return reg.test(str)
    }
  },

  /**
   * 将页面地址的url后面所带的参数列表获取到，并且转换为json格式
   * @name    unEscapeToJson
   * @param   {String} url地址
   * @return  {json}
   * 常用：var temp_url = decodeURI(window.location.href);
   * var tempJson = fn.unEscapeToJson(temp_url);
   */
  unEscapeToJson: function(url) {
    let postData = url.substring(url.indexOf('?') + 1, url.length).split('&'),
      tempJson = {}
    for (let i = 0; i < postData.length; i++) {
      let tempText = postData[i],
        key = tempText.substring(0, tempText.indexOf('=')),
        val = tempText.substring(tempText.indexOf('=') + 1, tempText.length)
      tempJson[key] = val
    }
    return tempJson
  },

  /**
   * 在文章内容回显时过滤敏感字方法
   * @name    filterText
   * @param   {String} Text 文章内容
   * @param   {Array} sensitiveWordsList 要过滤的敏感词，数组类型如：["哈","呵呵"]
   * @return  {String}
   */
  filterText: function(Text,sensitiveWordsList) {
  // 过滤后的文字
    let outText = ''
    // 遍历敏感词库，替换为*，并把处理后的文字赋值给outText
    for(let i = 0;i < sensitiveWordsList.length;i++) {
      let pattern = new RegExp(sensitiveWordsList[i],'g')
      if(i == 0) {
        outText = Text.replace(pattern,'*')
      }else{
        outText = outText.replace(pattern,'*')
      }
    }
    return outText
  },
  /**
   * 时间戳转化为年 月 日 时 分 秒
   * number: 传入时间戳
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
   * fn.formatTime('1350052653','Y-M-D h:m:s')
   */
  formatTime: function(number, format) {
    let formateArr = ['Y', 'M', 'D', 'h', 'm', 's'],
      returnArr = [],

      date = new Date(number)
    returnArr.push(date.getFullYear())
    returnArr.push(this.formatNumber(date.getMonth() + 1))
    returnArr.push(this.formatNumber(date.getDate()))

    returnArr.push(this.formatNumber(date.getHours()))
    returnArr.push(this.formatNumber(date.getMinutes()))
    returnArr.push(this.formatNumber(date.getSeconds()))

    for (let i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i])
    }
    return format
  },

  /**
   * 数组转化为树结构
   * @name    composeTree
   * @param   {Array} 数组
   * @return  {Array}
   * 常用：var list = [{id:1,pid:0,name:'一级'},{id:2,pid:1,name:'一级1'},{id:3,pid:1,name:'一级2'},{id:4,pid:2,name:'一级1-1'}]
   * let tree = composeTree(list)
   * console.log(tree)
   */
  composeTree: function(list = []) {
    const data = JSON.parse(JSON.stringify(list)), // 深拷贝不改变源数据
      result = []
    if (!Array.isArray(data)) {
      return result
    }
    data.forEach(item => {
      delete item.children
    })
    const map = {}
    data.forEach(item => {
      map[item.id] = item
    })
    data.forEach(item => {
      const parent = map[item.pid]
      if (parent) {
        (parent.children || (parent.children = [])).push(item)
      } else {
        result.push(item)
      }
    })
    return result
  },

  /*
   * 时间差比较：
   *      interval ：D表示查询精确到天数的之差
   *      interval ：H表示查询精确到小时之差
   *      interval ：M表示查询精确到分钟之差
   *      interval ：S表示查询精确到秒之差
   *      interval ：T表示查询精确到毫秒之差
   */
  dateDiff: function(interval, date1, date2) {
    // eslint-disable-next-line no-unused-vars
    let objInterval = { 'D': 1000 * 60 * 60 * 24, 'H': 1000 * 60 * 60, 'M': 1000 * 60, 'S': 1000, 'T': 1 }
    interval = interval.toUpperCase()
    /*
     * var dt1 = new  Date(Date.parse(date1.replace(/-/g, '/')));
     * var dt2 = new  Date(Date.parse(date2.replace(/-/g, '/')));
     */
    let dt1 = new Date(Date.parse(date1.replace(/-/g, '/'))),
      dt2 = new Date(Date.parse(date2.replace(/-/g, '/')))
    try {
      return Math.round((dt2.getTime() - dt1.getTime()) / eval('objInterval.' + interval))
    } catch (e) {
      return e.message
    }
  },
  // Base64 to Blob
  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  },

  //  Blob to Base64
  blobToDataURL(blob, callback) {
    const a = new FileReader()
    a.onload = function(e) {
      callback(e.target.result)
    }
    a.readAsDataURL(blob)
  },
  /**
   * 过滤对象中为空的属性
   * @param obj
   * @returns {*}
   */
  filterObj(obj) {
    if (!(typeof obj === 'object')) {
      return
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) &&
        (obj[key] == null || obj[key] == undefined || obj[key] === '')) {
        delete obj[key]
      }
    }
    return obj
  },
  /**
   * 获取最后一个 / 后面的值
   * @param url
   * @returns {*}
   */
  getLastStr(url) {
    // 获取最后一个/的位置
    // eslint-disable-next-line no-useless-escape
    const site = url.lastIndexOf('\/')
    // 截取最后一个/后的值
    return url.substring(site + 1, url.length)
  }

}
