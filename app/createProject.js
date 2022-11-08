const { ipcMain, dialog, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const iconvLite = require('iconv-lite')
const { getPath } = require('../util/getPath')

// ipcMain.on('select-catalog', event => {
//   dialog.showOpenDialog({
//     properties: ['openDirectory']
//   }).then(async res => {
//     const { canceled, filePaths } = res
//     if (!canceled) {
//       await writeCatalog(filePaths)
//       event.returnValue = 'success'
//     } else event.returnValue = 'fail'
//   }).catch(error => console.log(error))
// })

async function getConfigJson() {
  const config = await fs.readFileSync(getPath('config/index.json'))
  return JSON.parse(config)
}
// 检查是否存在项目目录信息
async function isExistProject() {
  return false
  const { catalogPath } = await getConfigJson()
  return !!catalogPath
}

/**
 * @description 创建选择项目目录的弹窗
 */
async function createProject(_window, _app) {
  _window.rootWindow = new BrowserWindow({
    width: 200,
    height: 250,
    opacity: 0,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  _window.rootWindow.loadFile(getPath('_dist/empty.html'))
  choiceAction(_window, _app)
}

/**
 * @description 选择动作,是选择已有项目/创建/退出
 */
async function choiceAction(_window, _app) {
  const buttonInteger =  await dialog.showMessageBoxSync(_window.rootWindow, {
    message: '目前还没有博客项目哦',
    detail: '请选择或创建vite-press项目吧',
    buttons: ['打开已有项目', '创建(等待开发)', '退出!爷不用了'],
    cancelId: 2,
  })
  // 打开已有项目
  if (buttonInteger === 0) {
    dialog.showOpenDialog(_window.rootWindow, {
      properties: ['openDirectory']
    }).then(async res => {
      const { canceled, filePaths } = res
      if (!canceled) {
        await writeCatalog(filePaths[0])
      } else createProject(_window, _app) 
    }).catch(error => console.log(error))
  }
  if (buttonInteger === 1) {
    // 后续开发
    fs.cp(
      getPath('public/template'),
      getPath('project'),
      { recursive: true },
      async () => {
        await writeCatalog(getPath('project'))
        const loadingBar = new BrowserWindow({
          parent: _window.rootWindow,
          modal: true,
          width: 460,
          height: 320,
          frame: false,
          show: false,
          backgroundColor: 'rgb(55, 65, 81)',
          webPreferences: { 
            nodeIntegration: true,
            contextIsolation: false
          },
        })
        loadingBar.loadURL('http://localhost:5500/create-project-loading')
        loadingBar.once('ready-to-show', () => {
          loadingBar.show()
          const childProcess = spawn(
            'npm i', 
            {
              cwd: getPath('project'),
              shell: true
            }
          )
          childProcess.stdout.on('data', data => {
            loadingBar.webContents.postMessage('createProjectInfo', { info: iconvLite.decode(data, 'cp936'), type: 1 })
          })
          childProcess.stderr.on('data', (data) => {
            loadingBar.webContents.postMessage('createProjectInfo', { info: iconvLite.decode(data, 'cp936'), type: 2 })
          })
          // 应该还有个3 error 暂时不写了
          childProcess.stdout.on('close', () => {
            // const notification = new Notification({
            //   body: '安装node_modules完成',
            //   silent: true,
            //   timeoutType: 'default',
            // })
            // notification.show()
            // _window.close()
            // const { initMainWindow } = require('../main')
            // initMainWindow()
          })
        })
      }
    )
  }
  if (buttonInteger === 2) {
    _window.rootWindow.close()
    const { initMainWindow } = require('../main')
    initMainWindow()
    // _app.exit()
  }
}
// 写入 catalogPath
async function writeCatalog(catalogPath, _configJson) {
  const configJson = _configJson || await getConfigJson()
  configJson.catalogPath = catalogPath
  fs.writeFileSync(path.resolve(__dirname, '../config/index.json'), JSON.stringify(configJson))
  // 写入后通知渲染进程切换路由
}
module.exports = {
  isExistProject,
  createProject
}