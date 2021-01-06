import { remove, isDef } from '@/utils/util'

describe('工具类方法测试', () => {
  it('判断元素是否已定义', () => {
    let arrs = [1, 3, 4, 5, 7, 9]
    expect(isDef(arrs)).toBeTruthy
  })
  it('清除数组中的其他元素', () => {
    let arrs = [1, 3, 4, 5, 7, 9]
    expect(remove(arrs, 1)).toContain(1)
  })
})
