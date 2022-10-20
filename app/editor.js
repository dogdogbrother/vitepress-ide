const { BrowserWindow } = require('electron')
const { getEdit_height_width_x_y } = require('../util/windowChange')
/**
 * @description 创建主页面的编辑区域
 */
function createEditor(_window, _app) {
  _window.editorWindow = new BrowserWindow({
    parent: _window.mainWindow,
    minWidth: 200,
    frame: false,
    ...getEdit_height_width_x_y(_window.mainWindow),
    hasShadow: false,
    thickFrame: false,
    roundedCorners: false,
    focusable: false,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  _window.editorWindow.loadURL('http://localhost:5500/editor')
  // new WindowChange(_window.mainWindow, _window.menuWindow)
}

module.exports = {
  createEditor
}