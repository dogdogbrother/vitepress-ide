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
  return <div className="w-screen h-screen px-4 py-2">
    {
      stroe.menus.map(menu => {
        const { text } = menu
        return <div className='py-2 text-4 cursor-pointer flex' key={text} onClick={toDoc(menu)}>
          <p className='flex-1 font-semibold'>{text}</p>
          <span>123</span>
        </div>
      })
    }
  </div>
}

export default observer(Menu)