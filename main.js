const {app, BrowserWindow } = require('electron')
// const isDev = require('electron-is-dev')
const { isExistProject, createProject } = require('./app/createProject')
const { createCatalog } = require('./app/catalog')
const { getPath } = require('./util/getPath')
const { createEditor } = require('./app/editor')
const { getWindowCinfig } = require('./util/getParams')
const path = require('path')

const windows = {}
const offset = process.platform === 'darwin' ? 0 : 8

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
    ...getWindowCinfig(1200, 1000, 900 + offset + offset, undefined, 500, true),
    opacity: 1
  })
  windows.mainWindow.loadFile(path.resolve(__dirname, './_dist/empty.html'))
  // createCatalog 是支持awit的 暂时不用
  createCatalog(windows, app) // 等待左侧的menu加载完了再加载右侧的编辑区域
  createEditor(windows, app)
}
module.exports = {
  initMainWindow
}


