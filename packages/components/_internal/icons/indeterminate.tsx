import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Indeterminate',
  render() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 13H5c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1 .45 1 1s-.45 1-1 1z"
          fill-rule="evenodd"
          fill="currentColor"
        ></path>
      </svg>
    )
  }
})
