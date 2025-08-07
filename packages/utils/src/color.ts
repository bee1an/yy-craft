/**
 * @function rgba
 * @description 将十六进制颜色转换为RGB颜色
 * @param {string} hex hex color string
 * @param {number} alpha alpha
 * @returns rgba color string
 */
export function rgba(hex: string, alpha: number) {
  const str = hex.replace('#', '')
  const count = str.length / 3
  const power = 6 / str.length
  const r
    = Number.parseInt(`0x${str.substring(0 * count, 1 * count)}`) ** power
  const g
    = Number.parseInt(`0x${str.substring(1 * count, 2 * count)}`) ** power
  const b = Number.parseInt(`0x${str.substring(2 * count)}`) ** power
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
