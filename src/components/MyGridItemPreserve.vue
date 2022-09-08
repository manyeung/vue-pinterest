<template>
  <div ref="root">
    <div class="hide">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    forId: [String, Number],
  },
  data() {
    return {
      el: null
    }
  },
  methods: {
    getWrapper() {
      const wrapper = document.getElementById('preserve-wrapper')
      if (wrapper) {
        return wrapper
      }

      const el = document.createElement('div')
      el.id = 'preserve-wrapper'
      el.style.position = 'absolute'
      el.style.top = '-999px'
      el.style.left = '-999px'
      el.style.width = '1px'
      el.style.height = '1px'
      el.style.overflow = 'hidden'
      el.style.clip = 'rect(0px, 1px, 1px, 0px)'
      document.body.appendChild(el)
      return el
    },
  },
  mounted() {
    const wrapper = this.getWrapper()
    const el = wrapper.querySelector(`#${this.forId}`) || document.getElementById(this.forId)
    const parent = this.$refs.root
    parent.appendChild(el)
    this.el = el

    this.$refs.root.querySelector('.hide').remove()
  },
  beforeDestroy() {
    const el = this.el
    const wrapper = document.getElementById('preserve-wrapper')
    wrapper.appendChild(el)
  },
}
</script>

<style scoped>
.hide {
  display: none;
}
</style>