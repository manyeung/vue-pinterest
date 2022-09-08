<template>
  <my-grid :images="images" v-slot="{items}">
    <my-grid-scroller :items="items" v-slot="{renderItems}">
      <my-grid-view-item v-for="(item) in renderItems" :key="item.id"
        :width="item.rect.width"
        :height="item.rect.height"
        :x="item.rect.x"
        :y="item.rect.y"
      >
        <!-- <div :style="{width: `${item.rect.width}px`, height: `${item.rect.height}px`, border: '1px solid red', position: 'relative'}">
          width: {{item.rect.width}}<br/>
          height: {{item.rect.height}}<br/>
          x: {{item.rect.x}}<br/>
          y: {{item.rect.y}}
          <span style="position: absolute; left: 0; top: 0">{{item.rect.y}}</span>
          <span style="position: absolute; left: 0; bottom: 0">{{item.rect.y + item.rect.height}}</span>
        </div> -->
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
          <my-grid-item-preserve :for-id="`_${item.id}`">
            <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls loop :id="`_${item.id}`"></video>
          </my-grid-item-preserve>
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
import MyGridItemPreserve from '../components/MyGridItemPreserve.vue'

export default {
  components: { 
    MyGridViewItem, 
    MyGrid, 
    MyGridScroller,
    MyGridItemPreserve,
  },
  props: {
    images: {
        type: Array,
        default: () => []
    }
  },
}
</script>
