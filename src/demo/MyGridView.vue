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
        <div :style="{width: `${item.rect.width}px`, height: `${item.rect.height}px`, border: '1px solid red', position: 'relative'}">
          width: {{item.rect.width}}<br/>
          height: {{item.rect.height}}<br/>
          x: {{item.rect.x}}<br/>
          y: {{item.rect.y}}
          <span style="position: absolute; left: 0; top: 0">{{item.rect.y}}</span>
          <span style="position: absolute; left: 0; bottom: 0">{{item.rect.y + item.rect.height}}</span>
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
