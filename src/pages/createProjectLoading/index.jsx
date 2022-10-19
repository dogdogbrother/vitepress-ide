import stroe from '@/store'
import { observer } from 'mobx-react-lite'
function Loading() {
  return <div className="w-screen h-screen p-2 bg-gray-700 overflow-auto no-scrollbar">
    <h4 className='text-gray-200 font-medium text-lg'>正在执行 npm install 请稍后</h4>
    {
      stroe.createProjectInfo.map((info, index) => {
        if (info.type === 1) {
          return <p className='text-green-600' key={index}>{info.info}1</p>
        }
        if (info.type === 2) {
          return <p className='text-yellow-600' key={index}>{info.info}2</p>
        }
      })
    }
  </div>
}

export default observer(Loading)