const directLR = ['left', 'right'],
  directLRDU = ['left', 'right', 'down', 'up'],
  directLRDUBig = ['downBig', 'upBig', 'leftBig', 'rightBig'],
  directLRTB = ['topLeft', 'bottomRight', 'topRight', 'bottomLeft'],
  directLRDownUp = ['downLeft', 'upRight', 'downRight', 'upLeft'],

  // animate.css 配置
  ANIMATE = {
    preset: [ // 预设动画配置
      { name: 'back', alias: '渐近', directions: directLRDU },
      { name: 'bounce', alias: '弹跳', directions: directLRDU.concat('default') },
      { name: 'fade', alias: '淡化', directions: directLRDU.concat(directLRDUBig).concat(directLRTB).concat('default') },
      { name: 'flip', alias: '翻转', directions: ['x', 'y'] },
      { name: 'lightSpeed', alias: '光速', directions: directLR },
      { name: 'rotate', alias: '旋转', directions: directLRDownUp.concat('default') },
      { name: 'roll', alias: '翻滚', directions: ['default'] },
      { name: 'zoom', alias: '缩放', directions: directLRDU.concat('default') },
      { name: 'slide', alias: '滑动', directions: directLRDU }
    ]
  }
module.exports = ANIMATE
