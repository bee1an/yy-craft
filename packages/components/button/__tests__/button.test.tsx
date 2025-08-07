import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import wave from '../../_internal/wave/src/wave.vue'
import Button from '../src/button.vue'

describe('button.vue', () => {
  it('create', () => {
    const wrapper = mount(Button, {
      slots: {
        default: () => 'defaultSlot',
      },
    })

    expect(wrapper.text()).toContain('defaultSlot')
  })

  it('exist Wave', () => {
    const wrapper = mount(Button)

    expect(wrapper.findComponent(wave).exists()).toBe(true)
  })

  it('unexist Wave', () => {
    const wrapper = mount(Button, {
      props: {
        secondary: true,
      },
    })

    expect(wrapper.findComponent(wave).exists()).toBe(false)
  })

  it('strong', () => {
    const wrapper = mount(Button, {
      props: {
        strong: true,
      },
    })

    expect(wrapper.find('.yy-button__content').classes()).toContain(
      'yy-button__content--strong',
    )
  })

  it('click', () => {
    /*
      不能测试动画
      TODO: jsdom getAnimations is undefined
      detail: https://github.com/jsdom/jsdom/issues/3852
      不确定是否会修复
    */

    // 这里不使用主要按钮就不会触发动画
    const wrapper = mount(Button, {
      props: {
        secondary: true,
      },
    })

    wrapper.trigger('click')
    wrapper.trigger('click')

    // 触发了两次所以长度为2
    expect(wrapper.emitted('click')).toHaveLength(2)

    expect(wrapper.emitted()).toHaveProperty('click')
  })
})
