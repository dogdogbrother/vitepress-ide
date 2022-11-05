import { makeAutoObservable } from "mobx"
const { ipcRenderer } = require('electron')

class DocStore {
  docContent = ''  // 文档的内容
  docPath = ''  // 文档的路径,可以作为key使用
  constructor() {
    makeAutoObservable(this)
    ipcRenderer.on('viewDoc', (_event, info) => {
      this.setDoc(JSON.parse(info))
    })
  }
  setDoc({docContent, docPath}) {
    this.docContent = docContent
    this.docPath = docPath
  }
}

export default DocStore