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
