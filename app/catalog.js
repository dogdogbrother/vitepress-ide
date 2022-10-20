const { BrowserWindow } = require('electron')
const { getMenu_height_x_y } = require('../util/windowChange')
const { getWindowCinfig } = require('../util/getParams')
/**
 * @description 创建编辑器左侧的目录菜单
 * @param {*} windows 
 * @param {*} app 
 */
function createCatalog(_window, _app) {
  return new Promise((resolve) => {
    _window.menuWindow = new BrowserWindow({
      parent: _window.mainWindow,
      width: 300,
      minWidth: 300,
      frame: false,
      ...getMenu_height_x_y(_window.mainWindow),
      hasShadow: false,
      thickFrame: false,
      roundedCorners: false,
      focusable: false,
      webPreferences: { 
        nodeIntegration: true,
        contextIsolation: false
      },
    })
    _window.menuWindow.loadURL('http://localhost:5500/menu')
    _window.menuWindow.on('ready-to-show', () => {
      resolve()
    })
  })
}

module.exports = {
  createCatalog
}