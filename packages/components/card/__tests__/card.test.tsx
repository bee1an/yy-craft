import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Card from '..'
import { h } from 'vue'
import { createCSSVar } from '@yy-ui/utils'

describe('Card.tsx', () => {
	it('create', () => {
		const wrapper = mount(Card)

		expect(wrapper.exists()).toBe(true)
	})

	it('card title', () => {
		const wrapper = mount(Card, {
			props: {
				title: 'card title'
			}
		})

		const bem = wrapper.vm.bem

		expect(wrapper.find('.' + bem.b('header').e('title').value).text()).toBe('card title')
	})

	it('card function title', () => {
		const wrapper = mount(Card, {
			props: {
				title: () =>
					h(
						'span',
						{
							class: 'card-span-title'
						},
						'card function title'
					)
			}
		})

		expect(wrapper.find('.card-span-title').text()).toBe('card function title')
	})

	it('card size', async () => {
		const wrapper = mount(Card, {
			props: {
				size: 'small'
			}
		})

		expect(wrapper.element.style.getPropertyValue(createCSSVar('paddingTop'))).toBe('12px')

		await wrapper.setProps({ size: 'medium' })
		expect(wrapper.element.style.getPropertyValue(createCSSVar('paddingTop'))).toBe('19px')

		await wrapper.setProps({ size: 'large' })
		expect(wrapper.element.style.getPropertyValue(createCSSVar('paddingTop'))).toBe('23px')

		await wrapper.setProps({ size: 'huge' })
		expect(wrapper.element.style.getPropertyValue(createCSSVar('paddingTop'))).toBe('27px')
	})

	it('bordered', async () => {
		const wrapper = mount(Card, {
			props: {
				bordered: true
			}
		})

		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('bordered').value)

		await wrapper.setProps({ bordered: false })
		expect(wrapper.classes()).not.toContain(wrapper.vm.bem.b().m('bordered').value)
	})

	it('hoverable', async () => {
		const wrapper = mount(Card, {
			props: {
				hoverable: true
			}
		})

		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('hoverable').value)

		await wrapper.setProps({ hoverable: false })
		expect(wrapper.classes()).not.toContain(wrapper.vm.bem.b().m('hoverable').value)
	})

	it('segmented', async () => {
		const wrapper = mount(Card, {
			props: {
				segmented: true
			}
		})

		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('content-segmented').value)
		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('footer-segmented').value)
		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('action-segmented').value)

		await wrapper.setProps({ segmented: false })
		expect(wrapper.classes()).not.toContain(wrapper.vm.bem.b().m('content-segmented').value)
		expect(wrapper.classes()).not.toContain(wrapper.vm.bem.b().m('footer-segmented').value)
		expect(wrapper.classes()).not.toContain(wrapper.vm.bem.b().m('action-segmented').value)

		await wrapper.setProps({ segmented: { action: true } })
		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('action-segmented').value)
		await wrapper.setProps({ segmented: { action: 'soft' } })
		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('action-segmented').value)

		await wrapper.setProps({ segmented: { content: true } })
		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('content-segmented').value)
		await wrapper.setProps({ segmented: { content: 'soft' } })
		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('content-soft-segmented').value)

		await wrapper.setProps({ segmented: { footer: true } })
		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('footer-segmented').value)
		await wrapper.setProps({ segmented: { footer: 'soft' } })
		expect(wrapper.classes()).toContain(wrapper.vm.bem.b().m('footer-soft-segmented').value)
	})
})
