export interface Gap {
  row: string
  col: string
}

function getGap(value: string): Gap
function getGap(value: string, orient: 'row' | 'col'): string
/**
 * @function getGap
 * @description 获取css gap
 * @param value gap value
 * @param {'row' | 'col'} [orient] 方向
 */
function getGap(value: string, orient?: 'row' | 'col'): string | Gap {
  const [rowGap, colGap] = value.split(' ')
  if (!orient)
    return {
      row: rowGap,
      col: colGap || rowGap
    }
  return orient === 'row' ? rowGap : colGap
}

export { getGap }

/**
 * @function px
 * @description 给一个值添加px单位
 * @param {string | number} value
 * @returns {string}
 */
export function px(value: number | string | undefined): string | undefined {
  if (typeof value === 'undefined') {
    return value
  }

  return `${depx(value)}px`
}

/**
 * @function depx
 * @description 去掉px单位
 * @param {string | number} value px value
 * @returns {number}
 */
export function depx(value: string | number): number {
  if (typeof value === 'string') {
    if (value.endsWith('px')) {
      return Number(value.slice(0, value.length - 2))
    }
    return Number(value)
  }
  return value
}

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

/**
 * @function var
 * @description 生成CSS变量，并使用var()函数
 * @param 同createCSSVar函数
 * @returns {'var(同createCSSVar函数返回值)'}
 */
export function cVar(...args: Parameters<typeof createCSSVar>): string {
  return `var(${createCSSVar(...args)})`
}
