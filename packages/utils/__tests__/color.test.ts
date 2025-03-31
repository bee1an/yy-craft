import { describe, expect, it } from 'vitest'
import { rgba } from '..'

describe('color', () => {
	const hexColors = [
		{ hex: '#000000', alpha: 0, rgb: { r: 0, g: 0, b: 0 } },
		{ hex: '#ffffff', alpha: 0.5, rgb: { r: 255, g: 255, b: 255 } },
		{ hex: '#ff0000', alpha: 1, rgb: { r: 255, g: 0, b: 0 } }
	]

	it.for(hexColors)(
		'hex $hex & alpha $alpha -> rgba($rgb.r, $rgb.g, $rgb.b, $alpha)',
		({ hex, alpha, rgb }) => {
			expect(rgba(hex, alpha)).toBe(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`)
		}
	)
})
