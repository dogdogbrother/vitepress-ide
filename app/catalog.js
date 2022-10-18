const { ipcMain, dialog } = require('electron')
const fs = require('fs')
const path = require('path')

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
  const { catalogPath } = await getConfigJson()
  return !!catalogPath
}

// 创建选择项目目录的弹窗
async function createProject(_window, _app) {
  const buttonInteger =  await dialog.showMessageBoxSync(_window, {
    message: '目前还没有博客项目哦',
    detail: '请选择或创建vite-press项目吧',
    buttons: ['退出 👴🏻不用了', '打开已有项目', '创建(等待开发)']
  })
  if (buttonInteger === 0) {
    _app.exit()
  }
  // 打开已有项目
  if (buttonInteger === 1) {
    dialog.showOpenDialog(_window, {
      properties: ['openDirectory']
    }).then(async res => {
      const { canceled, filePaths } = res
      if (!canceled) {
        await writeCatalog(filePaths[0])
      } else createProject(_window, _app) 
    }).catch(error => console.log(error))
  }
  if (buttonInteger === 2) {
    // 后续开发
  }
}

// 写入 catalogPath
async function writeCatalog(catalogPath, _configJson) {
  const configJson = _configJson || await getConfigJson()
  configJson.catalogPath = catalogPath
  await fs.writeFileSync(path.resolve(__dirname, '../config/index.json'), JSON.stringify(configJson))
  // 写入后通知渲染进程切换路由
}
module.exports = {
  isExistProject,
  createProject
}