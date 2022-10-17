const {app, BrowserWindow, ipcMain} = require('electron')
const isDev = require('electron-is-dev')
const { isExistProject } = require('./app/catalog')

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 680,
    webPreferences: { 
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWindow.loadURL(isDev ? 'http://localhost:5173' : '')
  isExistProject(mainWindow, app)
})