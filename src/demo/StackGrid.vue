<template>
  <stack
            :column-min-width="300"
            :gutter-width="15"
            :gutter-height="15"
            monitor-images-loaded
    >
      <stack-item
              v-for="(image, i) in images"
              :key="i"
              style="transition: opacity 300ms"
      >
        <div class="yt-wrapper" v-if="image.youtube">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/-xPGbKOSUDg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <div class="yt-wrapper" v-else-if="image.video">
          <video src="https://www.w3schools.com/html/mov_bbb.mp4" controls></video>
        </div>
        <div v-else>
          <img :src="image.urls.small" :alt="image.alt_description" />
          <p>{{image.alt_description}}</p>
        </div>
      </stack-item>
    </stack>
</template>

<script>
import Stack from "../components/Stack.vue";
import StackItem from "../components/StackItem.vue";

export default {
  components: {
    Stack,
    StackItem,
  },
  props: {
    images: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style>

</style>