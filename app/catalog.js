const { BrowserWindow } = require('electron')
const { getMenu_height_x_y } = require('../util/windowChange')
const fs = require('fs')
const { getPath } = require('../util/getPath')
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
      maxWidth: 600,
      // maxWidth: 这个应该是父级窗口 - 右侧最小宽度也就是300,
      frame: false,
      ...getMenu_height_x_y(_window.mainWindow),
      hasShadow: false,
      thickFrame: false,
      roundedCorners: false,
      // focusable: false,
      focusable: true,
      webPreferences: { 
        nodeIntegration: true,
        contextIsolation: false
      },
    })
    _window.menuWindow.loadURL('http://localhost:5500/menu')
    _window.menuWindow.on('ready-to-show', async () => {
      resolve()
      const MenuConfig = await import('../public/template/docs/.vitepress/config.mjs')
      _window.menuWindow.webContents.postMessage('changeMenus', JSON.stringify(MenuConfig))
    })
  })
}

module.exports = {
  createCatalog
}