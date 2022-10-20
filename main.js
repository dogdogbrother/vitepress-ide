const {app, BrowserWindow } = require('electron')
// const isDev = require('electron-is-dev')
const { isExistProject, createProject } = require('./app/createProject')
const { createCatalog } = require('./app/catalog')
const { getPath } = require('./util/getPath')
const { createEditor } = require('./app/editor')

const windows = {}

app.on('ready', async () => {
  const _isExistProject = await isExistProject()
  // 如果没有项目 透明的窗口
  if (!_isExistProject) {
    createProject(windows, app)
  } else {
    initMainWindow()
  }
})

async function initMainWindow() {
  windows.mainWindow = new BrowserWindow({
    width: 1280,
    height: 1000,
    minWidth: 550,
    minHeight: 500,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  windows.mainWindow.loadFile(getPath('public/empty.html'))
  // createCatalog 是支持awit的 暂时不用
  createCatalog(windows, app) // 等待左侧的menu加载完了再加载右侧的编辑区域
  createEditor(windows, app)
}
module.exports = {
  initMainWindow
}


