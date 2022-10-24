const { BrowserWindow, ipcMain } = require('electron')
const { WindowChange, getEdit_height_width_x_y } = require('../util/windowChange')
const fs = require('fs')
const { getDocPath } = require('../util/getPath')
/**
 * @description 创建主页面的编辑区域
 */
function createEditor(_window, _app) {
  _window.editorWindow = new BrowserWindow({
    parent: _window.mainWindow,
    minWidth: 300,
    frame: false,
    ...getEdit_height_width_x_y(_window.mainWindow),
    hasShadow: false,
    thickFrame: false,
    roundedCorners: false,
    focusable: false,
    resizable: false,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  _window.editorWindow.loadURL('http://localhost:5500/editor')
  new WindowChange(_window)
  // 监听菜单栏左侧的点击,找到对应的文件，解析出内容发送给编辑器用
  ipcMain.on('to-doc', async (_e, link) => {
    console.log(link);
    const config = await fs.readFileSync(getDocPath(link), 'utf8')
    _window.editorWindow.webContents.postMessage('viewDoc', config)
  })
}



module.exports = {
  createEditor
}