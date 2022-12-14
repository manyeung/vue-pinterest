<template>
  <div class="vsg-container" ref="container" v-images-loaded:on.progress="imagesLoaded">
    <slot></slot>
  </div>
</template>

<script>
  import imagesLoaded from 'vue-images-loaded'

  export default {
    props: {
      columnMinWidth: {
        type: Number,
        required: true
      },
      gutterWidth: {
        type: Number,
        default: 0
      },
      gutterHeight: {
        type: Number,
        default: 0
      },
      monitorImagesLoaded: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        containerWidth: 0,
        columnCount: 0,
        columnWidth: 0,
        baseColumns: []
      }
    },
    mounted() {
      window.addEventListener('resize', this.reflow)
      this.update()
    },
    destroyed() {
      window.removeEventListener('resize', this.reflow)
    },
    methods: {
      updateColumnData() {
        this.containerWidth = this.getContainerWidth()
        this.columnCount = this.getColumnCount()
        this.columnWidth = this.getColumnWidth()
      },
      getContainerWidth() {
        return this.$refs.container ? this.$refs.container.clientWidth : 0
      },
      getColumnCount() {
        /* eslint-disable no-constant-condition */
        for (let i = 1; true; i++)
        {
          let w = i * this.columnMinWidth + (i - 1) * this.gutterWidth
          if (w > this.containerWidth)
            return Math.max(i - 1, 1)
        }
      },
      getColumnWidth() {
        return (this.containerWidth - (this.columnCount - 1) * this.gutterWidth) / this.columnCount
      },
      getBaseColumns() {
        let cols = []
        for (let i = 0; i < this.columnCount; i++)
          cols.push({
            x: i * (this.columnWidth + this.gutterWidth),
            h: 0
          })
        return cols
      },
      update() {
        console.log('update')
        this.$nextTick(this.reflow)
      },
      reflow() {
        console.log('reflow');
        this.updateColumnData()
        let cols = this.getBaseColumns()

        this.$emit('reflow', {
          containerWidth: this.containerWidth,
          columnCount: this.columnCount,
          columnWidth: this.columnWidth,
        })

        this.$children.forEach((child, i) => {
          child.$el.style.width = this.columnWidth + 'px'

          let n = 0
          if (i < this.columnCount)
            n = i
          else
          {
            let minH = -1
            cols.forEach((col, j) => {
              if ((minH == -1) || (col.h < minH))
              {
                n = j
                minH = col.h
              }
            })
          }

          child.$el.style.transform = 'translate(' + cols[n].x + 'px, ' + cols[n].h + 'px)'
          child.$el.style.opacity = '1'
          cols[n].h += child.$el.offsetHeight + this.gutterHeight
        })

        let containerHeight = 0
        cols.forEach(col => containerHeight = Math.max(containerHeight, col.h))
        this.$el.style.height = containerHeight + 'px'
      },
      imagesLoaded() {
        this.$emit('images-loaded')

        if (this.monitorImagesLoaded)
          this.reflow()
      }
    },
    directives: {
      imagesLoaded
    }
  }
</script>

<style scoped>
  .vsg-container {
    display: block;
    position: relative;
    width: 100%;
  }
</style>
