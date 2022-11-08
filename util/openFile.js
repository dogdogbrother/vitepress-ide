const isDev = require('electron-is-dev')
const path = require('path')
/**
 * @description 根据是否为开发模式决定打开的是文件还是在线地址
 * @param {*} _wondow 
 * @param {*} _path 
 */
function loadURL(_window, _path) {
  if (isDev) {
    _window.loadURL(`http://localhost:5500#${_path}`)
  } else {
    _window.loadURL(`file://${path.resolve(__dirname, '../_dist/index.html#' + _path)}`)
  }
}

module.exports = {
  loadURL
}