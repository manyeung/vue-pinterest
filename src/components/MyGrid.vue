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
    }
  },
  computed: {
    items() {
      const rectangles = SimpleMasonry.generateRectangles({
        dimensions: this.images,
        columns: 3,
        width: 1200,
        gutter: 20,
      })

      return rectangles.map((rect, i) => {
        return {...this.images[i], rect}
      })
    },
    containerHeight() {
      const len = this.items.length
      let maxHeight = 0;

      for (let i = len-1; i >= len-3 && i>=0; i--) {
        const rect = this.items[i].rect
        maxHeight = Math.max(maxHeight, rect.height + rect.y)
      }

      return maxHeight
    },
  },
  watch: {
    containerHeight(val) {
      this.$refs.container.style.height = `${val}px`
    }
  },
  mounted(){
    this.$refs.container.style.height = `${this.containerHeight}px`
  }
}
</script>

<style scoped>
.grid-container {
  position: relative;
}
</style>