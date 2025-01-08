/**
 * @function createKey
 * @description 生成key
 * @param {string} prefix 前缀
 * @param  {string} suffix 后缀
 */
export const createKey = <P extends string, S extends string>(
  prefix: P,
  suffix: S
): S extends 'default' ? P : `${P}${Capitalize<S>}` => {
  return (prefix +
    (suffix === 'default'
      ? ''
      : suffix.replace(/^[a-z]/, startChar => startChar.toUpperCase()))) as any
}

/**
 * @function createId
 * @description 生成随机字符串
 * @param {number} length 长度
 * @returns {string} 随机字符串
 */
export const createId = (length: number = 8): string =>
  Math.random()
    .toString(16)
    .slice(2, 2 + length)
