import stroe from '@/store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
const { ipcRenderer } = require('electron')

function Menu() {
  useEffect(() => {
    function handleContextMenu(e) {
      e.preventDefault()
      // console.log(e.target);
      ipcRenderer.send('menuContextMenu')
    }
    window.addEventListener('contextmenu', handleContextMenu)
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [])
  const toDoc = (menu) => () => {
    // ipcRenderer.send('to-doc', JSON.stringify(menu))
    ipcRenderer.send('to-doc', menu.link)
  }
  return <div className="w-screen h-screen">
    {
      stroe.menus.map(menu => {
        const { text } = menu
        return <div key={text} onClick={toDoc(menu)}>{text}</div>
      })
    }
  </div>
}

export default observer(Menu)