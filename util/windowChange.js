// 当父级窗口产生位移，最大化，窗口化，移动，缩放时候  左侧目录和右侧编辑区域 子窗口也要跟着变动

// windows 平台下有8的偏移量,mac正常
const offset = process.platform === 'darwin' ? 0 : 8
class WindowChange {
  parent = null
  catalog = null
  editor = null
  /**
   * 
   * @param {object} parent 父级窗口实例
   * @param {object} catalog 子级窗口左侧实例
   * @param {object} editor 子级窗口右侧实例
   */
  constructor({mainWindow, menuWindow, editorWindow}) {
    this.parent = mainWindow
    this.catalog = menuWindow
    this.editor = editorWindow
    this.parentWindowChange()
  }
  // 当父级窗口改变大小和移动时
  parentWindowChange() {
    this.parent.on('resize', () => {
      const parentContentSize = this.parent.getContentSize()
      const parentSize = this.parent.getBounds()

      const catalogContentSize = this.catalog.getContentSize()
      const catalogSize = this.catalog.getBounds()

      const editorContentSize = this.editor.getContentSize()
      const editorSize = this.editor.getBounds()
      // console.log(parentContentSize);
      // console.log(parentSize);
      console.log(catalogContentSize);
      console.log(catalogSize);
      /**
       * 改变大小有宽度和高度的变化，高度变化比较简单，直接把父级给下去就行
       * 
       * 宽度的改变麻烦点 -- 宽度变化时优先变动右侧部分,当在缩小时，右侧到达最小宽度时，再改变左侧的。
       * 
       * 判断是x轴是缩小还是变大 -- ((左侧宽度 + 右侧宽度) > 父级宽度) === 缩小
       */
      const isZoom = catalogContentSize[0] + editorContentSize[0] > parentContentSize[0]
      
      if (!isZoom) {
        
      }
      console.log(isZoom)

      // this.catalog.setSize(catalog[0], contentSize[1])
      // this.child.setPosition(size.x + offset, size.y + size.height - contentSize[1] - offset)
    })
    this.parent.on('move', () => {
      const size = this.parent.getBounds()
      const contentSize = this.parent.getContentSize()
      const Y = size.y + size.height - contentSize[1] - offset
      this.catalog.setPosition(size.x + offset, Y)
      this.editor.setPosition(size.x + offset + 300, Y)
    })
  }
}

/**
 * @description 根据父级的窗口位置,得出menu的 高度 x y
 * @param {object} parent 父级窗口实例
 * @returns 创建menu子窗口时的位置参数
 */
function getMenu_height_x_y(parent) {
  const size = parent.getBounds()
  const contentSize = parent.getContentSize()
  
  return {
    height: contentSize[1],
    x: size.x + offset,
    y: size.y + size.height - contentSize[1] - offset,
  }
}

/**
 * @description 根据父级的窗口位置,得出editor的 高度 宽度 x y
 * @param {object} parent 父级窗口实例
 * @returns 创建editor子窗口时的位置参数
 */
 function getEdit_height_width_x_y(parent) {
  const size = parent.getBounds()
  const contentSize = parent.getContentSize()
  return {
    height: contentSize[1],
    width: contentSize[0] - 300,
    x: size.x + offset + 300,
    y: size.y + size.height - contentSize[1] - offset,
  }
}

module.exports = {
  WindowChange,
  getMenu_height_x_y,
  getEdit_height_width_x_y
}