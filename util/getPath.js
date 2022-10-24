const path = require('path')

/**
 * 
 * @param {string} rootPath 传入根路径 public/index
 * @returns path.resolve 结果
 */
function getPath(rootPath) {
  return path.resolve(__dirname, '../', rootPath)
}

/**
 * 
 * @param {string} docPath 传入路径 返回 /public/template/doc/后拼接的内容
 * @returns path.resolve 结果
 */
 function getDocPath(docPath) {
  return path.resolve(__dirname, `../public/template/docs/${docPath}`)
}

module.exports = {
  getPath,
  getDocPath
}