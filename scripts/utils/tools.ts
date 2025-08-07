/**
 * Return a string with the first character capitalized.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Converts a string from dash notation to camelcase
 *
 * @example
 * camelcase('hello-world') // helloWorld
 */
export function camelcase(str: string): string {
  return str.replace(/-([a-z])/g, g => g[1].toUpperCase())
}

/**
 * Converts a string from camelcase to kebab notation
 *
 * @example
 * kebabCase('helloWorld') // hello-world
 */
export function kebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
