/**
 * @function isObject
 * @description 判断这个值是否是对象
 * @param { any } value 序言判断的值
 * @returns { boolean }
 */
export const isObject = (value: any): boolean => {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
