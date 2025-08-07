import { capitalize, kebabCase } from '../utils/tools'

export function getEntryContent(
  name: string,
  extension: 'vue' | 'tsx' = 'vue',
) {
  let _extension = ''

  if (extension === 'vue') {
    _extension = '.vue'
  }

  const installVariable = `${name}WithInstall`

  return `import { withInstall } from '@yy-craft/utils/src/with-install'
import ${name} from './src/${kebabCase(name)}${_extension}'

const ${installVariable} = withInstall(${name})

export * from './src/${kebabCase(name)}'
export { ${installVariable}, ${name} }
export default ${name}

declare module 'vue' {
  export interface GlobalComponents {
    Yy${capitalize(name)}: typeof ${name}
  }
}
`
}
