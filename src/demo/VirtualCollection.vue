<template>
  <VirtualCollection
      :cellSizeAndPositionGetter="cellSizeAndPositionGetter"
      :collection="computedImages"
      :height="height"
      :width="width"
  >
    <div slot="cell" slot-scope="image">
      <div class="yt-wrapper" v-if="image.data.youtube">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/-xPGbKOSUDg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="yt-wrapper" v-else-if="image.data.video">
        <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
      </div>
      <div v-else>
        <img :src="image.data.urls.small" :alt="image.data.alt_description" />
      </div>
    </div>
  </VirtualCollection>
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
    computedImages() {
      return this.images.map(image => {
        return {data: image}
      })
    },
    rectangles() {
      return SimpleMasonry.generateRectangles({
        dimensions: this.images,
        columns: 3,
        width: this.width,
        gutter: 20,
      })
    }
  },
  data () {
      return {
          width: 1200,
          height: 600
      }
  },
  methods: {
      cellSizeAndPositionGetter(item, index) {
          // compute size and position
          return this.rectangles[index]
      },
  }
}
</script>

<style>

</style>