import { makeAutoObservable } from "mobx"
const { ipcRenderer } = require('electron')

class Store {
  createProjectInfo = []
  constructor() {
    makeAutoObservable(this)
    ipcRenderer.on('createProjectInfo', (_event, info) => {
      // type 1是 success 2是 warning 3是 error  暂时没有3
      this.addCreateProjectInfo(info)
    })
  }
  addCreateProjectInfo = (info) => {
    this.createProjectInfo.push(info)
  }
 }

 export default new Store()
