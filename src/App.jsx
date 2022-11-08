import './App.css'
import { Routes, Route, HashRouter } from 'react-router-dom'
import CreateProjectLoading from './pages/createProjectLoading'
import Menu from './pages/menu'
import Editor from './pages/editor'
import CreateMenu from './pages/createMenu'
// const { ipcRenderer } = require('electron')

function App() {
  return <div className="App">
    <HashRouter>
      <Routes>
        {/* 创建项目时安装node_modules时的加载信息 */}
        <Route path="/create-project-loading" element={<CreateProjectLoading />}></Route>
        {/* 编辑器的左侧菜单 */}
        <Route path='/menu' element={<Menu />}></Route>
        {/* 编辑器的右侧编辑区域 */}
        <Route path='/editor' element={<Editor />}></Route>
        <Route path='/create-menu' element={<CreateMenu />}></Route>
      </Routes>
    </HashRouter>
  </div>
  
  // function openFiles() {
  //   const isSuccess = ipcRenderer.sendSync('select-catalog')
  // }
}

export default App
