/**
 * @function createCSSVar
 * @description 生成CSS变量
 * @param {string} name 变量名
 * @param {string} [prefix] 前缀
 * @returns {string}
 */
export function createCSSVar(name: string, prefix: string = 'y'): string {
  let newName = '--' + prefix + '-'

  for (let index = 0; index < name.length; index++) {
    const char = name[index]

    newName += char === char.toUpperCase() ? '-' + char.toLowerCase() : char
  }

  return newName
}
