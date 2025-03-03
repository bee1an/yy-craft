import { defineComponent, onMounted, ref, Transition } from 'vue'

export default defineComponent({
  name: 'BaseIconSwitchTransition',
  setup(_, { slots }) {
    const isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true
    })
    return () => (
      <Transition name="icon-switch-transition" appear={isMounted.value}>
        {slots}
      </Transition>
    )
  }
})
