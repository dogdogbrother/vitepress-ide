const {app, BrowserWindow, ipcMain, Tray, nativeImage } = require('electron')
const isDev = require('electron-is-dev')
const { isExistProject, createProject } = require('./app/catalog')
const path = require('path')

const windows = {}

app.on('ready', async () => {
  const _isExistProject = await isExistProject()
  // 如果没有项目 透明的窗口
  if (!_isExistProject) {
    windows.rootWindow = new BrowserWindow({
      width: 300,
      height: 340,
      opacity: 0,
      webPreferences: { 
        nodeIntegration: true,
        contextIsolation: false
      },
    })
    windows.rootWindow.loadFile(path.resolve(__dirname, 'public/empty.html'))
    createProject(windows.rootWindow, app)
  }
})