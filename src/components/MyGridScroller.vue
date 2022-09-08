<template>
  <fragment>
    <slot :renderItems="renderItems"></slot>
  </fragment>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      renderItems: []
    }
  },
  watch: {
    items() {
      this.getRenderItems()
    }
  },
  methods: {
    getItems() {
      if (this.$route.path === '/my-grid-3') {
        // https://stackoverflow.com/questions/8318264/how-to-move-an-iframe-in-the-dom-without-losing-its-state
        // seems that not possible to move an iframe
        const filteredItems = this.items.filter(it => !it.youtube)
        const iframeItems = this.items.filter(it => it.youtube)
        return [filteredItems, iframeItems]
      }
      return [this.items, []]
    },
    getRenderItems() {
      const [filteredItems, iframeItems] = this.getItems()
      const windowHeight = window.innerHeight
      const scrollTop = document.getElementsByTagName('html')[0].scrollTop
      const scrollBottom = scrollTop + windowHeight
      const offsetTop = scrollTop + this.$parent.$refs.container.getBoundingClientRect().top
      document.getElementById('scroll-top').innerText = scrollTop
      document.getElementById('scroll-bottom').innerText = scrollBottom

      let min = Number.POSITIVE_INFINITY
      let max = -1
      const renderItems = []
      for (let i = 0; i < filteredItems.length; i++) {
        const item = filteredItems[i]
        const top = item.rect.y + offsetTop
        const middle = item.rect.y + item.rect.height/2 + offsetTop
        const bottom = item.rect.y + item.rect.height + offsetTop
        if (
          (scrollTop <= top && top <= scrollBottom) || 
          (scrollTop <= middle && middle <= scrollBottom) ||
          (scrollTop <= bottom && bottom <= scrollBottom)
        ) {
          renderItems.push(item)
          min = Math.min(min, i)
          max = Math.max(max, i)
        }
      }

      const extra = 10
      const items1 = filteredItems.slice(Math.max(min-extra, 0), min)
      const items2 = filteredItems.slice(max+1, max+extra)
      renderItems.splice(0, 0, ...items1)
      renderItems.push(...items2)
      renderItems.splice(0, 0, ...iframeItems)

      this.renderItems = renderItems
    },
  },
  mounted() {
    document.addEventListener('scroll', this.getRenderItems)
    window.addEventListener('resize', this.getRenderItems)
    this.getRenderItems()
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.getRenderItems)
    window.removeEventListener('resize', this.getRenderItems)
  },
}
</script>