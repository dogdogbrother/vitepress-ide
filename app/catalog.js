const { BrowserWindow, ipcMain, Menu, MenuItem } = require('electron')
const { getMenu_height_x_y } = require('../util/windowChange')
const { createMenu } = require('./createMenu')
const { loadURL } = require('../util/openFile')

// 刚创建了新的menu的时候，还要通知更新menu
async function sendMenuConfig(_window) {
  const MenuConfig = require('../_dist/template/docs/.vitepress/config.cjs')
  _window.menuWindow.webContents.postMessage('changeMenus', JSON.stringify(MenuConfig.default.themeConfig))
}

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
    loadURL(_window.menuWindow, '/menu')
    _window.menuWindow.on('ready-to-show', async () => {
      _window.menuWindow.webContents.openDevTools()
      resolve()
      sendMenuConfig(_window)
      // _window.menuWindow.webContents.openDevTools()
    })
    ipcMain.on('menuContextMenu', (e, _info) => {
      const menu = new Menu()
      menu.append(new MenuItem({
        label: "创建导航",
        click: () => {
          createMenu(_window, _app)  
        }
      }))
      menu.popup(BrowserWindow.fromWebContents(e.sender))
    })
  })
}
module.exports = {
  createCatalog,
  sendMenuConfig
}