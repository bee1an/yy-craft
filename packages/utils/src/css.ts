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
