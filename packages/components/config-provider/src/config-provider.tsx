import type { ThemeKey } from '@yy-craft/theme-chalk'
import type { ExtractPropTypes, PropType } from 'vue'
import { providerKey } from '@yy-craft/constants/src/providerKey'
import {
  computed,
  defineComponent,
  getCurrentInstance,
  provide,
  reactive,
} from 'vue'

export const configProviderProps = {
  theme: {
    type: String as PropType<ThemeKey | (string & {})>,
    default: 'light',
  },
}

export type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>

export default defineComponent({
  name: 'ConfigProvider',
  props: configProviderProps,
  setup(props) {
    const provideValue = reactive({
      theme: computed(() => props.theme),
    })

    const instance = getCurrentInstance()

    /*
     * yy-craft中有的组件并不在常规的组件树下, 例如 message 组件
     * 它是通过 composable 的方式挂载到 body 上的
     * 所以它不会在组件树中被找到, provider 也就无法被注入
     * 但是它跟当前组件拥有同一个appContext, 所以我们将providerValue挂载到appContext.provides上
     */
    if (instance?.appContext.provides) {
      instance.appContext.provides[
        providerKey as keyof typeof instance.appContext.provides
      ] = provideValue
    }

    provide(providerKey, provideValue)
  },
  render() {
    return this.$slots.default?.()
  },
})
