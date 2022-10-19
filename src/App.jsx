import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import CreateProjectLoading from './pages/createProjectLoading'
// const { ipcRenderer } = require('electron')

function App() {
  return <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/create-project-loading" element={<CreateProjectLoading />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
  
  // function openFiles() {
  //   const isSuccess = ipcRenderer.sendSync('select-catalog')
  // }
}

export default App
