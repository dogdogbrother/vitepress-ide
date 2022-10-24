import stroe from '@/store'
import { observer } from 'mobx-react-lite'

function Editor() {
  return <div className="w-screen h-screen bg-green-600">
    {stroe.doctext}
  </div>
}   

export default observer(Editor)