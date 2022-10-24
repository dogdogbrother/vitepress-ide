import { makeAutoObservable } from "mobx"
const { ipcRenderer } = require('electron')

class Store {
  createProjectInfo = []  // 创建项目时的命令行的信息输出
  menus = []  // 左侧menus
  constructor() {
    makeAutoObservable(this)
    ipcRenderer.on('createProjectInfo', (_event, info) => {
      // type 1是 success 2是 warning 3是 error  暂时没有3
      this.addCreateProjectInfo(info)
    })
    ipcRenderer.on('changeMenus', (_event, info) => {
      // nav: [
      //   {
      //     text: '用法介绍', link: '/用法介绍.md'
      //   }
      // ],
      // sidebar: {
        // "/front/react/": [   // 对应的是 nav.link的路径
        //   {
        //     title: "react基础hook",
        //     path: "/front/react/react基础.md",
        //   },
        // ]
      // }
      // 路由: nav 负责上层路由,sidebar负责子路由 
      const { nav, sidebar } = JSON.parseinfo(info)
      const routers = []
      nav.forEarch(n => {
        console.log(n);
        const { text, link, items } = n
      })
      // this.addCreateProjectInfo(info)
      this.changeMenus(info)
    })
  }
  addCreateProjectInfo = (info) => {
    this.createProjectInfo.push(info)
  }
  changeMenus = (menus) => {
    this.menus = menus
  }
 }

 export default new Store()
