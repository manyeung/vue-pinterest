<template>
  <my-grid :images="images" 
    :breakpoints="{
      'gte 1280': {
        columns: 3,
        gutter: 15,
      },
      'default': {
        columns: 2,
        gutter: 15,
      }
    }" 
    v-slot="{items}"
  >
    <my-grid-scroller :items="items" v-slot="{renderItems}">
      <my-grid-view-item v-for="(item) in renderItems" :key="item.id"
        :width="item.rect.width"
        :height="item.rect.height"
        :x="item.rect.x"
        :y="item.rect.y"
      >
        <div class="yt-wrapper" v-if="item.youtube">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/-xPGbKOSUDg" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen 
            :id="item.id"
          ></iframe>
        </div>
        <div class="yt-wrapper" v-else-if="item.video">
          <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls loop></video>
        </div>
        <div class="text-wrapper" v-else-if="item.text">
          <p>Ea eiusmod sint non deserunt enim occaecat dolor. Nostrud voluptate voluptate elit dolore anim enim nulla culpa officia voluptate sit fugiat quis. Et excepteur ex velit culpa cillum.</p>
        </div>
        <div v-else>
          <img :src="item.urls.small" :alt="item.alt_description" />
        </div>
      </my-grid-view-item>
    </my-grid-scroller>
  </my-grid>
</template>

<script>
import MyGrid from '../components/MyGrid.vue'
import MyGridViewItem from '../components/MyGridItem.vue'
import MyGridScroller from '../components/MyGridScroller.vue'

export default {
  components: { 
    MyGridViewItem, 
    MyGrid, 
    MyGridScroller,
  },
  props: {
    images: {
        type: Array,
        default: () => []
    }
  },
}
</script>
