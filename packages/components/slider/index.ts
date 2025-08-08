import { withInstall } from '@yy-craft/utils/src/with-install'
import slider from './src/slider.vue'

const sliderWithInstall = withInstall(slider)

export * from './src/slider'
export { slider, sliderWithInstall }
export default slider

declare module 'vue' {
  export interface GlobalComponents {
    YySlider: typeof slider
  }
}
