import './App.css'
import { Button } from 'antd'
const { ipcRenderer } = require('electron')

function App() {
  return (
    <div className="App">
      <div>
        <Button type='primary' onClick={openFiles}>打开目录</Button>
      </div>
    </div>
  )
  function openFiles() {
    const isSuccess = ipcRenderer.sendSync('select-catalog')
    console.log(isSuccess);
  }
}

export default App
