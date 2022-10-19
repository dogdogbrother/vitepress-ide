import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateProjectLoading from './pages/createProjectLoading'
import Menu from './pages/Menu'
// const { ipcRenderer } = require('electron')

function App() {
  return <div className="App">
    <BrowserRouter>
      <Routes>
        {/* 创建项目时安装node_modules时的加载信息 */}
        <Route path="/create-project-loading" element={<CreateProjectLoading />}></Route>
        {/* 编辑器的左侧菜单 */}
        <Route path='/menu' element={<Menu />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
  
  // function openFiles() {
  //   const isSuccess = ipcRenderer.sendSync('select-catalog')
  // }
}

export default App
