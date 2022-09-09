<template>
  <div class="grid-container" ref="container">
    <slot :items="items"></slot>
  </div>
</template>

<script>
import SimpleMasonry from 'simple-masonry-layout'

export default {
  props: {
    images: {
      type: Array,
      default: () => []
    },
    breakpoints: {
      type: Object,
      default: () => ({
        'gte 1280': {
          columns: 3,
          gutter: 15,
        },
        'default': {
          columns: 2,
          gutter: 15,
        },
      })
    }
  },
  data() {
    return {
      items: [],
      currentBreakpoint: null,
    }
  },
  computed: {
    containerHeight() {
      const len = this.items.length
      let maxHeight = 0;

      for (let i = len - 1; i >= len - 3 && i >= 0; i--) {
        const rect = this.items[i].rect
        maxHeight = Math.max(maxHeight, rect.height + rect.y)
      }

      return maxHeight
    },
  },
  watch: {
    images() {
      this.setItems(true)
    },
    containerHeight(val) {
      this.$refs.container.style.height = `${val}px`
    }
  },
  methods: {
    isBreakpoint(operator, size) {
      switch (operator) {
        case 'gt':
          return window.innerWidth > size
        case 'gte':
          return window.innerWidth >= size
        case 'lt':
          return window.innerWidth < size
        case 'lte':
          return window.innerWidth <= size
        case 'eq':
          return window.innerWidth == size
        default:
          return false
      }
    },
    getBreakpoint() {
      for (const key in this.breakpoints) {
        if (Object.hasOwnProperty.call(this.breakpoints, key)) {
          const obj = this.breakpoints[key]
          const [operator, size] = key.split(' ')
          if (this.isBreakpoint(operator, parseInt(size))) {
            return [key, obj]
          }
        }
      }
      return ['default', this.breakpoints.default]
    },
    setItems(force = false) {
      const [breakpoint, breakpointObj] = this.getBreakpoint()

      if (!force && this.currentBreakpoint == breakpoint) {
        return
      }

      const rectangles = SimpleMasonry.generateRectangles({
        dimensions: this.images,
        width: this.$refs.container.clientWidth,
        ...breakpointObj
      })

      const items = rectangles.map((rect, i) => {
        return { ...this.images[i], rect }
      })

      this.items = items
      this.currentBreakpoint = breakpoint
    },
  },
  mounted() {
    window.addEventListener('resize', this.setItems)
    this.setItems()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.setItems)
  },
}
</script>

<style scoped>
.grid-container {
  position: relative;
}
</style>