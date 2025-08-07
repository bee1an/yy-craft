import { mount } from '@vue/test-utils'
import { CreateNamespace } from '@yy-craft/utils'
import { describe, expect, it } from 'vitest'
import Checkbox from '..'

describe('checkbox.vue', () => {
  it('create', () => {
    const wrapper = mount(Checkbox, { props: { modelValue: true } })

    expect(wrapper.exists()).toBe(true)
  })

  it('modelValue', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        'modelValue': true,
        'onUpdate:modelValue': value =>
          wrapper.setProps({ modelValue: value }),
      },
    })

    const bem = new CreateNamespace('checkbox')

    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(wrapper.props('modelValue')).toBe(false)
    expect(wrapper.classes()).not.toContain(bem.m('checked').value)

    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(3)
    expect(wrapper.props('modelValue')).toBe(false)
    expect(wrapper.classes()).not.toContain(bem.m('checked').value)

    await wrapper.trigger('click')
    await wrapper.trigger('click')
    await wrapper.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(6)
    expect(wrapper.props('modelValue')).toBe(true)

    expect(wrapper.classes()).toContain(bem.m('checked').value)
  })

  it('label', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: true,
        label: 'label',
      },
    })

    const bem = new CreateNamespace('checkbox')

    expect(wrapper.find(`.${bem.e('label').value}`).exists()).toBe(true)
    expect(wrapper.find(`.${bem.e('label').value}`).text()).toBe('label')

    await wrapper.setProps({ label: 'new label' })
    expect(wrapper.find(`.${bem.e('label').value}`).text()).toBe('new label')
  })

  it('indeterminate', async () => {
    const wrapper = mount(Checkbox, {
      props: {
        modelValue: false,
        indeterminate: true,
      },
    })

    const bem = new CreateNamespace('checkbox')

    expect(wrapper.classes()).toContain(bem.m('checked').value)
    expect(wrapper.classes()).toContain(bem.m('indeterminate').value)

    await wrapper.setProps({ indeterminate: false })
    expect(wrapper.classes()).not.toContain(bem.m('indeterminate').value)
  })
})
