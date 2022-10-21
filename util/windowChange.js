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
      const parentPositionSize = this.parent.getBounds()
      const catalogSize = this.catalog.getBounds()
      const editorSize = this.editor.getBounds()
      const editorMinWidth = this.editor.getMinimumSize()[0]
      /**
       * 改变大小有宽度和高度的变化，高度变化比较简单，直接把父级给下去就行
       * 
       * 宽度的改变麻烦点 -- 宽度变化时优先变动右侧部分,当在缩小时，右侧到达最小宽度时，再改变左侧的。
       * 
       * 判断是x轴是缩小还是变大 -- ((左侧宽度 + 右侧宽度) > 父级宽度) === 缩小
       */
      const lessen = catalogSize.width + editorSize.width > parentContentSize[0]
      const isMinimum = editorSize.width <= editorMinWidth
      if (lessen) {
        // 判断当前右侧是否到了最小宽度,没有的话不对左侧进行宽度更改
        if (!isMinimum) {
          this.catalog.setSize(catalogSize.width, parentContentSize[1])
          // 右侧宽度 = 父级宽度 - 左侧宽度
          const rightWidth = parentContentSize[0] - catalogSize.width
          this.editor.setSize(rightWidth, parentContentSize[1])
        } else {
          this.editor.setSize(editorSize.width, parentContentSize[1])
          // 左侧宽度 = 父级宽度 - 左侧宽度
          const leftWidth = parentContentSize[0] - editorSize.width
          this.catalog.setSize(leftWidth, parentContentSize[1])
        }
      } else {
        // 放大的话 只处理右侧就行了
        const rightWidth = parentContentSize[0] - catalogSize.width
        this.editor.setSize(rightWidth, parentContentSize[1])
        this.catalog.setSize(catalogSize.width, parentContentSize[1])
      }
      // 随时更新左侧的maxWidth 因为后续左侧拉大时会把右面顶出去 所以要限定最大宽度
      const leftMaxWidth = parentContentSize[0] - editorMinWidth
      this.catalog.setMaximumSize(leftMaxWidth, parentContentSize[1])
      // 如果是上下拉动,还要设置左侧和右侧的 x值
      const parentHeight = parentPositionSize.height - parentContentSize[1] + parentPositionSize.y
      this.catalog.setPosition(catalogSize.x, parentHeight)
      this.editor.setPosition(editorSize.x, parentHeight)
    })
    this.parent.on('move', () => {
      const size = this.parent.getBounds()
      const contentSize = this.parent.getContentSize()
      const catalogSize = this.catalog.getBounds()
      const Y = size.y + size.height - contentSize[1] - offset
      const rightX = size.x + offset + catalogSize.width
      this.catalog.setPosition(size.x + offset, Y)
      this.editor.setPosition(rightX, Y)
    })
    // 目录改变 右侧的尺寸和x轴向 都跟着变,
    this.catalog.on('resize', () => {
      const catalogSize = this.catalog.getBounds()
      const parentContentSize = this.parent.getContentSize()
      const rightWidth = parentContentSize[0] - catalogSize.width
      this.editor.setSize(rightWidth, catalogSize.height)
      // 右侧的x值是左侧的x+宽度
      const rightX = catalogSize.x + catalogSize.width
      this.editor.setPosition(rightX, catalogSize.y)
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