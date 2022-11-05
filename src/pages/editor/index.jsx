import stroe from '@/store'
import { observer } from 'mobx-react-lite'
import Prism from 'prismjs'
import { useState, useEffect, useRef } from 'react'
function Editor() {
  // {stroe.doctext}
  const [content, setContent] = useState('')
  const textareaRef = useRef(null)
  const ref = useRef(null)
  function onEnterKey(e) {
    const pointStart = e.target.selectionStart
    const pointEnd = e.target.selectionEnd
    const textLength = e.target.value.length
    const content = e.target.value
    if (e.key === 'Tab') {
      if (textLength === pointStart) {
        const newContent = content + '  '
        setContent(newContent)
        textareaRef.current.value = newContent
        return e.preventDefault()
      } else {
        const newContent = content.slice(0, pointStart) + '  ' + content.slice(pointEnd)
        e.target.setSelectionRange(pointStart + 2, pointStart + 2)
        textareaRef.current.value = newContent
        setContent(newContent)
        return e.preventDefault()
      }
    }
  }
  useEffect(() => {
    if (ref && ref.current) {
      Prism.highlightElement(ref.current)
    }
  }, [content])
  useEffect(() => {
    setContent(stroe.doctext)
    textareaRef.current.value = stroe.doctext
  }, [stroe.doctext])
  function onInput(e) {
    setContent(e.target.value)
  }

  return <div className="w-screen min-h-screen bg-green-600 relative" style={{ overflowY: 'auto' }}>
    <textarea 
      spellCheck="false"
      className='
        absolute 
        inset-0 
        outline-none 
        border-none 
        z-50
      '
      style={{
        caretColor: '#fff',
        color: 'transparent',
        background: 'transparent'
      }}
      ref={textareaRef}
      onInput={onInput}
      onKeyDown={onEnterKey}
    ></textarea>
    <pre 
      className='
        min-h-screen
        w-screen
        border-none 
        rounded-none 
        z-40
      '
    >
      <code ref={ref} className="language-markdown line-numbers">
        {content}
      </code>
    </pre>
  </div>
}   

export default observer(Editor)