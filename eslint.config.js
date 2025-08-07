import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    vue: true,
  },
  {
    rules: {
      'vue/no-reserved-component-names': 'off',
      'no-console': 'warn',
    },
  },
)
