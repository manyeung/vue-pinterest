<template>
  <div ref="item" class="grid-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
  },
  methods: {
    setPosition() {
      const el = this.$refs.item
      el.style.width = `${this.width}px`
      el.style.height = `${this.height}px`
      el.style.transform = `translate3d(${this.x}px, ${this.y}px, 0)`
    }
  },
  mounted() {
    this.setPosition();
  },
  updated() {
    this.setPosition();
  }
}
</script>

<style scoped>
.grid-item {
  position: absolute;
  top: 0;
  left: 0;
}
</style>