import './App.css'
const { ipcRenderer } = require('electron')

function App() {
  return (
    <div className="App">

    </div>
  )
  function openFiles() {
    const isSuccess = ipcRenderer.sendSync('select-catalog')
    console.log(isSuccess);
  }
}

export default App
