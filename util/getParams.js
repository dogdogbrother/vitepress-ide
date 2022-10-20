

/**
 * @description 返回窗口最基础的几个配置
 * @param {Number} width
 * @param {Number} height 
 * @param {Number} minWidth 
 * @param {Number} maxWidth 
 * @param {Number} minHeight 
 * @param {Boolean} webPreferences 为true 则加上nodeIntegration=true contextIsolation=false
 */
function getWindowCinfig(width, height, minWidth, maxWidth, minHeight, webPreferences) {
  return {
    width, 
    height, 
    minWidth, 
    maxWidth,
    minHeight,
    ...(webPreferences ? { nodeIntegration: true, contextIsolation: false } : {})
  }
}

module.exports = {
  getWindowCinfig
}