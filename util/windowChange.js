// 当父级窗口产生位移，最大化，窗口化，移动，缩放时候  子级别窗口也要跟着变动
class WindowChange {
  parent = null
  child = null
  /**
   * 
   * @param {object} parent 父级窗口实例
   * @param {object} child 子级窗口实例
   */
  constructor(parent, child) {
    this.parent = parent
    this.child = child
    this.parentWindowChange()
  }
  parentWindowChange() {
    this.parent.on('resize', () => {
      const contentSize = this.parent.getContentSize()
      this.child.setSize(300, contentSize[1])
    })
    this.parent.on('move', () => {
      const size = this.parent.getBounds()
      const contentSize = this.parent.getContentSize()
      this.child.setPosition(size.x + 8, size.y + size.height - contentSize[1] - 8)
    })
  }
}

/**
 * 
 * @param {object} parent 父级窗口实例
 * @returns 创建子窗口时的位置参数
 */
function getChild_height_x_y(parent) {
  const size = parent.getBounds()
  const contentSize = parent.getContentSize()
  return {
    height: contentSize[1],
    x: size.x + 8,
    y: size.y + size.height - contentSize[1] - 8,
  }
}

module.exports = {
  WindowChange,
  getChild_height_x_y
}