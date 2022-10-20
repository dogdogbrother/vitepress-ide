// 当父级窗口产生位移，最大化，窗口化，移动，缩放时候  左侧目录和右侧编辑区域 子窗口也要跟着变动
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
  constructor(parent, child, editor) {
    this.parent = parent
    this.child = child
    this.editor = editor
    this.parentWindowChange()
  }
  parentWindowChange() {
    this.parent.on('resize', () => {
      // const contentSize = this.parent.getContentSize()
      // const size = this.parent.getBounds()
      // this.child.setSize(300, contentSize[1])
      // const offset = process.platform === 'darwin' ? 0 : 8
      // this.child.setPosition(size.x + offset, size.y + size.height - contentSize[1] - offset)
    })
    this.parent.on('move', () => {
      // const size = this.parent.getBounds()
      // const contentSize = this.parent.getContentSize()
      // // windows 平台下有8的偏移量,mac正常
      // const offset = process.platform === 'darwin' ? 0 : 8
      // this.child.setPosition(size.x + offset, size.y + size.height - contentSize[1] - offset)
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
  // windows 平台下有8的偏移量,mac正常
  const offset = process.platform === 'darwin' ? 0 : 8
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
  const offset = process.platform === 'darwin' ? 0 : 8
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