import { describe, it, expect } from 'vitest'
import { CreateNamespace } from '..'

describe('create', () => {
	const namespace = 'yy'
	const block = 'button'
	const block2 = 'box'
	const element = 'icon'
	const modifier = 'disabled'
	const bem = new CreateNamespace('button')

	it('namespace-block', () => {
		expect(bem.value).toBe(`${namespace}-${block}`)
	})

	it('namespace-block__element', () => {
		expect(bem.e('icon').value).toBe(`${namespace}-${block}__${element}`)
	})

	it('namespace-block--modifier', () => {
		expect(bem.m('disabled').value).toBe(`${namespace}-${block}--${modifier}`)
	})

	it('namespace-block__element--modifier', () => {
		expect(bem.e('icon').m('disabled').value).toBe(`${namespace}-${block}__${element}--${modifier}`)
	})

	/* ----------------------------------------- */

	it('namespace-block-block', () => {
		expect(bem.b(block2).value).toBe(`${namespace}-${block}-${block2}`)
	})

	it('namespace-block-block__element', () => {
		expect(bem.b(block2).e(element).value).toBe(`${namespace}-${block}-${block2}__${element}`)
	})

	it('namespace-block-block--modifier', () => {
		expect(bem.b(block2).m(modifier).value).toBe(`${namespace}-${block}-${block2}--${modifier}`)
	})

	it('namespace-block-block__element--modifier', () => {
		expect(bem.b(block2).e(element).m(modifier).value).toBe(
			`${namespace}-${block}-${block2}__${element}--${modifier}`
		)
	})

	/* ----------------------------------------- */

	it('if empty block, do nothing', () => {
		expect(bem.b('').value).toBe(`${namespace}-${block}`)
	})

	it('if empty element, return empty string', () => {
		expect(bem.e('').value).toBe('')
	})

	it('if empty modifier, return empty string', () => {
		expect(bem.m('').value).toBe('')
	})
})
