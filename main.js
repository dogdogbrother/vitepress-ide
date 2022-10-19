const {app, BrowserWindow, ipcMain, Tray, nativeImage } = require('electron')
// const isDev = require('electron-is-dev')
const { isExistProject, createProject } = require('./app/catalog')
const path = require('path')
const { WindowChange, getChild_height_x_y } = require('./util/windowChange')

const windows = {}

app.on('ready', async () => {
  const _isExistProject = await isExistProject()
  // 如果没有项目 透明的窗口
  if (!_isExistProject) {
    windows.rootWindow = new BrowserWindow({
      width: 200,
      height: 250,
      opacity: 0,
      // icon: path.resolve(__dirname, 'assets/icon.png'),
      webPreferences: { 
        nodeIntegration: true,
        contextIsolation: false
      },
    })
    // if (process.platform === 'darwin') {
    //   app.dock.setIcon(path.resolve(__dirname, 'assets/icon.png'))
    // }
    windows.rootWindow.loadFile(path.resolve(__dirname, 'public/empty.html'))
    createProject(windows.rootWindow, app)
  } else {
    initMainWindow()
  }
})

function initMainWindow() {
  windows.mainWindow = new BrowserWindow({
    width: 1280,
    height: 1000,
    minWidth: 500,
    minHeight: 500,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  windows.mainWindow.loadFile(path.resolve(__dirname, 'public/empty.html'))
  windows.menuWindow = new BrowserWindow({
    parent: windows.mainWindow,
    width: 300,
    minWidth: 300,
    frame: false,
    ...getChild_height_x_y(windows.mainWindow),
    hasShadow: false,
    thickFrame: false,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  windows.menuWindow.loadURL('http://localhost:5500/menu')
  new WindowChange(windows.mainWindow, windows.menuWindow)
}
module.exports = {
  initMainWindow
}


