const path = require('path')

/**
 * 
 * @param {string} rootPath 传入根路径 public/index
 * @returns path.resolve 结果
 */
function getPath(rootPath) {
  return path.resolve(__dirname, '../', rootPath)
}

module.exports = {
  getPath
}