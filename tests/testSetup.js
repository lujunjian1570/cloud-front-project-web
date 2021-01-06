// 解决matchMedia not present, legacy browsers require a polyfill问题
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  }
}
