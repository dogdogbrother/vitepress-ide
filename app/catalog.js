const { ipcMain, dialog, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')
const iconvLite = require('iconv-lite')

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
  const config = await fs.readFileSync(path.resolve(__dirname, '../config/index.json'))
  return JSON.parse(config)
}
// 检查是否存在项目目录信息
async function isExistProject() {
  return false
  const { catalogPath } = await getConfigJson()
  return !!catalogPath
}

// 创建选择项目目录的弹窗
async function createProject(_window, _app) {
  const buttonInteger =  await dialog.showMessageBoxSync(_window, {
    message: '目前还没有博客项目哦',
    detail: '请选择或创建vite-press项目吧',
    buttons: ['打开已有项目', '创建(等待开发)', '退出!爷不用了'],
    cancelId: 2,
  })
  // 打开已有项目
  if (buttonInteger === 0) {
    dialog.showOpenDialog(_window, {
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
      path.resolve(__dirname, '../public/template'), 
      path.resolve(__dirname, '../project'),
      { recursive: true },
      async () => {
        await writeCatalog(path.resolve(__dirname, '../project'))
        const childProcess = spawn(
          'npm i', 
          {
            cwd: path.resolve(__dirname, '../project'),
            shell: true
          }
        )
        const loadingBar = new BrowserWindow({
          parent: _window,
          modal: true,
          width: 360,
          height: 200,
          frame: false
        })
        loadingBar.loadURL('http://localhost:5500/create-project-loading')
        childProcess.stdout.on('data', data => {
          // console.log(1, iconvLite.decode(data, 'cp936'));
        })
        childProcess.stdout.on('close', () => {
          loadingBar.close()
        })
        childProcess.stderr.on('data', (data) => {
          // console.log(2, iconvLite.decode(data, 'cp936'));
        })
      }
    )
  }
  if (buttonInteger === 2) {
    _app.exit()
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