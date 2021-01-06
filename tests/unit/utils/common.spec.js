
import { fn } from '@/utils/common'

describe('公用方法验证', () => {
  let htmlStr = '<span style=\'color:#ff0000\'>测试</span>',
    arrs = [1, 3, 4, 3, 6, 7, 3],
    arrs2 = [2, 6, 8, 10, 20]
  it('删除标签', () => {
    expect(fn.delHtmlTag(htmlStr)).toBe('测试')
  })
  it('取消行内样式', () => {
    expect(fn.replaceStr(htmlStr)).toEqual('<span >测试</span>')
  })
  it('获取数组中相同元素的个数', () => {
    expect(fn.getSameNum(3, arrs)).toBe(3)
  })
  it('如果大于三位数加“,”', () => {
    expect(fn.formatNumber(10000)).toBe('10,000')
    expect(fn.formatNumber(999)).toBe('999')
  })
  it('三位数字加个‘，’，尾数保留两位小数', () => {
    expect(fn.formatFixNumber(10000)).toBe('10,000.00')
    expect(fn.formatFixNumber(999)).toBe('999.00')
  })
  it('数组去重', () => {
    expect(fn.uniqArrs(arrs)).toStrictEqual([1, 3, 4, 6, 7])
  })
  it('判断两个数组相同的元素', () => {
    expect(fn.getArrEqual(arrs, arrs2)).toStrictEqual([6])
  })
  it('判断两个数组不同的元素', () => {
    expect(fn.getArrDifference(arrs, arrs2)).toStrictEqual([1, 4, 7, 2, 8, 10, 20])
  })
  it('是否邮箱', () => {
    expect(fn.testRule.isEmail('hello@163.com')).toBeTruthy() // 测试正常情况下
    expect(fn.testRule.isTel('hello')).toBeFalsy() // 测试规则以外的
    expect(fn.testRule.isTel('hello@key')).toBeFalsy() // 测试手机号少一位
    expect(fn.testRule.isTel('@key.com')).toBeFalsy() // 测试手机号多一位
  })
  it('是否是手机号', () => {
    expect(fn.testRule.isTel('18618334572')).toBeTruthy() // 测试正常情况下
    expect(fn.testRule.isTel('12322342342')).toBeFalsy() // 测试规则以外的
    expect(fn.testRule.isTel('1862234234')).toBeFalsy() // 测试手机号少一位
    expect(fn.testRule.isTel('135223423455')).toBeFalsy() // 测试手机号多一位
  })
  it('判断是否有汉字', () => {
    expect(fn.testRule.isWord('hello张')).toBeTruthy()
    expect(fn.testRule.isWord('hello')).toBeFalsy()
  })
  it('判断身份证号', () => {
    expect(fn.testRule.isCard('330303198812050977')).toBeTruthy()
    expect(fn.testRule.isCard('330303198814050977')).toBeFalsy()
    expect(fn.testRule.isCard('33030319881205097')).toBeFalsy()
    expect(fn.testRule.isCard('3303031988120509777')).toBeFalsy()
  })
  it('判断是否是数字', () => {
    expect(fn.testRule.isNum('5624854')).toBeTruthy()
    expect(fn.testRule.isNum('5624854s')).toBeFalsy()
  })
  it('传入js时间戳，应该获得正确格式化的时间年月日', () => {
    expect(fn.formatTime(1604996095048, 'Y-M-D')).toBe('2020-11-10')
  })
  it('传入js时间戳，应该获得正确格式化的时间年月日时分秒', () => {
    expect(fn.formatTime(1604996095048, 'Y-M-D h:m:s')).toBe('2020-11-10 16:14:55')
  })
  it('比较时间差', () => {
    expect(fn.dateDiff('D', '2020-11-16', '2020-11-19')).toBe(3)
  })
})
