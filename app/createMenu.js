// 创建menu的弹窗

const { BrowserWindow, ipcMain, Notification } = require('electron')
const fs = require('fs')
const path = require('path')
const prettier = require("prettier/standalone");
const parserBabel = require("prettier/parser-babel")
const { loadURL } = require('../util/openFile')
function createMenu(_window, _app) {
  _window.createMenu = new BrowserWindow({
    parent: _window.mainWindow,
    resizable: false,
    width: 582,
    height: 400,
    autoHideMenuBar: true,
    modal: true,
    title: '创建导航',
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    },
  })
  loadURL(_window.createMenu, '/create-menu')
  _window.createMenu.webContents.openDevTools()
  ipcMain.on('createMenu', async (_e, info) => {
    const MenuConfig = require('../_dist/template/docs/.vitepress/config.cjs')
    MenuConfig.default.themeConfig.nav.push({
      text: info.title,
      link: `/${info.link}.md`
    })
    const resConfig = JSON.stringify(MenuConfig.default)
    // 写入js文件
    await fs.writeFileSync(
      path.resolve(__dirname, '../_dist/template/docs/.vitepress/config.js'), 
      // 通过 prettier 工具写入文件，会有格式
      prettier.format(`export default ${resConfig}`, {
        parser: "babel",
      plugins: [parserBabel],
      })
    )
    // 写入cjs文件
    await fs.writeFileSync(
      path.resolve(__dirname, '../_dist/template/docs/.vitepress/config.cjs'), 
      prettier.format(`"use strict";
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports["default"] = void 0;
        var _default = ${resConfig};
        exports["default"] = _default;`,
        {
          parser: "babel",
          plugins: [parserBabel],
        }
      )
    )
    await fs.writeFileSync(path.resolve(__dirname, `../_dist/template/docs/${info.link}.md`), info.title)
    const notification = new Notification({
      body: `创建${info.title}成功`,
      silent: true,
      timeoutType: 'default',
    })
    notification.show()
    const { sendMenuConfig } = require('./catalog.js')
    sendMenuConfig(_window)
    _window.createMenu.close()
  })
}

module.exports = {
  createMenu
}