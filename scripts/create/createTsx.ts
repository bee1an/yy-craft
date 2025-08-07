import { mkdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { cmpDir } from '../utils/paths'
import { camelcase, capitalize, kebabCase } from '../utils/tools'
import { getEntryContent } from './common'

export function createTsx(
  name: string,
  option?: {
    withStyle?: boolean
    withTheme?: boolean
  },
) {
  const withTheme = option?.withTheme ?? false
  const withStyle = withTheme ? true : (option?.withStyle ?? false)

  const cmpPath = resolve(cmpDir, name)
  mkdirSync(cmpPath)

  // step 1 create entry file
  writeFileSync(
    join(cmpPath, 'index.ts'),
    getEntryContent(camelcase(name), 'tsx'),
  )

  // step 2 create src and tsx
  const srcPath = join(cmpPath, 'src')
  mkdirSync(srcPath)
  writeFileSync(
    join(srcPath, `${name}.tsx`),
    getContent(camelcase(name), withStyle, withTheme),
  )
}

function getContent(name: string, withStyle: boolean, withTheme: boolean) {
  function imports() {
    let str = ''
    if (!withStyle && !withTheme) {
      return str
    }

    let themeComposableVar = 'useTheme'

    let themeVariable = `${name}Style`

    if (withTheme) {
      themeComposableVar += `, useThemeProps`
      themeVariable += `, ${name}Dark, ${name}Light, type ${capitalize(name)}ThemeVars`
    }

    str += `import { CreateNamespace } from '@yy-craft/utils'
import { ${themeComposableVar} } from '@yy-craft/composables/use-theme'
import { ${themeVariable} } from '@yy-craft/theme-chalk/src/${kebabCase(name)}'
`

    return str
  }

  function setupContent() {
    let content = ''
    if (!withStyle && !withTheme) {
      return content
    }

    content += `
    const bem = new CreateNamespace('${name}')
`

    if (withTheme) {
      content += `
    const lightVars = ${name}Light.vars()
    const darkVars = ${name}Dark.vars()

    const theme = computed(() => {
      return {
        light: Object.assign({}, lightVars, {}),
        dark: Object.assign({}, darkVars, {})
      }
    })
    
    const { styleVars } = useTheme(theme, '${name}', ${name}Style, props)

    return { bem, styleVars }
`
      return content
    }

    content += `
    useTheme('${name}', ${name}Style)
    return { bem } 
  `

    return content
  }

  return `import { ${withTheme ? 'computed, ' : ''}defineComponent, type ExtractPropTypes } from 'vue'
${imports()}
export const ${name}Props = ${
  withTheme
    ? `{
  ...useThemeProps<${capitalize(name)}ThemeVars>()
}`
    : '{}'
}

export type ${capitalize(name)}Props = ExtractPropTypes<typeof ${name}Props>

export default defineComponent({
  name: '${capitalize(name)}',
  props: ${name}Props,
  setup(props) {${setupContent()}},
  render() {${withTheme ? '\n\t\tconst { bem, styleVars } = this\n' : withStyle ? '\n\t\tconst { bem } = this\n' : ''}
    return <div${withTheme ? ` style={styleVars}` : ''}${withStyle ? ` class={bem.b().value}` : ''}></div>
  }
})
`
}
