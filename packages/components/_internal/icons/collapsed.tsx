import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Collapsed',
  render() {
    return (
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <path d="M640 288L512 512l128 224-32 32L384 512l224-256z"></path>
      </svg>
    )
  }
})
