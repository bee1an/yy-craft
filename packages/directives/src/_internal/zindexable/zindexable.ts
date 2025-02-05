import { Directive } from 'vue'

let zIndex = 2000
const getIndex = () => (zIndex++).toString()

export const zindexable: Directive<HTMLElement> = {
  updated: el => {
    el.style.zIndex = getIndex()
  }
}
