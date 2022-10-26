// 创建menu的弹窗

const { BrowserWindow } = require('electron')

function createMenu(_window, _app) {
  _window.createMenu = new BrowserWindow({
    parent: _window.mainWindow,
    resizable: false,
    width: 595,
    height: 400,
    autoHideMenuBar: false,
    modal: true,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  _window.createMenu.loadURL('http://localhost:5500/create-menu')
  _window.createMenu.webContents.openDevTools()
}

module.exports = {
  createMenu
}