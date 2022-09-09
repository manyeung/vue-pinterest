<template>
  <fragment>
    <div class="container">
      <!-- <stack-grid :images="images" /> -->
      <!-- <virtual-collection :images="images" /> -->
      <!-- <my-grid-view :images="images" /> -->
      <component :is="currentComponent" :images="images"></component>
      <div class="button-wrapper">
        <button class="btn" @click="searchUnsplash('Autumn')">Autumn</button>
        <button class="btn" @click="searchUnsplash('cliff')">Cliff</button>
        <button class="btn" @click="searchUnsplash('ocean')">Ocean</button>
      </div>
    </div>
    <span id="scroll-top" style="position: fixed; left: 0; top: 0"></span>
    <span id="scroll-bottom" style="position: fixed; left: 0; bottom: 0"></span>
  </fragment>
</template>

<script>
import axios from "axios";
import StackGrid from './demo/StackGrid.vue';
import VirtualCollection from './demo/VirtualCollection.vue';
import MyGridView from './demo/MyGridView.vue';
import MyGridView2 from './demo/MyGridView2.vue';
import MyGridView3 from './demo/MyGridView3.vue';
import {v4 as uuidv4} from 'uuid'

export default {
  components: { 
    StackGrid,
    VirtualCollection,
    MyGridView,
  },
  data: () => ({
    images: [],
    page: 1,
  }),
  computed: {
    currentComponent() {
      switch(this.$route.path) {
        case '/stack-grid':
          return StackGrid

        case '/virtual-collection':
          return VirtualCollection

        case '/my-grid-1':
          return MyGridView
          
        case '/my-grid-2':
          return MyGridView2

        case '/my-grid-3':
          return MyGridView3

        default:
          return ''
      }
    }
  },
  methods: {
    searchUnsplash(topic) {
      // this.images = [];
      axios
        .get(
          `https://api.unsplash.com/search/photos?query=${topic}&per_page=20&page=${this.page}`,
          {
            headers: {
              Authorization:
                `Client-ID ${process.env.VUE_APP_ENV_UNSPLASH_ACCESS_KEY}`,
                "Accept-Version": "v1"
            }
          }
        )
        .then(response => {
          let images = this.images.slice(0)
          let newImages = response.data.results
          newImages.splice(5, 0, 
            {
              id: uuidv4(),
              youtube:1,
              width:100,
              height:66
            }, 
            {
              id: uuidv4(),
              youtube:1,
              width:100,
              height:66
            }, 
            {
              id: uuidv4(),
              text:1,
              width:500,
              height:500
            }, 
            {
              id: uuidv4(),
              video:1,
              width:100,
              height:66
            },
            {
              id: uuidv4(),
              video:1,
              width:100,
              height:66
            },
          )
          this.images = [].concat(images, newImages);
          this.page += 1
        })
        .catch(() => {
          this.images = [];
        });
    }
  }
}
</script>

<style>
.container {
  width: 800px;
  margin: 0 auto;
}
@media only screen and (min-width: 1280px) {
  .container {
    width: 1200px;
    margin: 0 auto;
  }
}
.button-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}
.btn {
  font-size: 18px;
  background-color: #42b983;
  color: white;
  padding: 10px 20px;
}
.btn:not(:last-child) {
  margin-right: 10px;
}
img {
  width: 100%;
  height: auto;
  border-radius: 12px;
}
.yt-wrapper {
  width: 100%;
  height: 0;
  padding-bottom: 66%;
  position: relative;
  background: red;
}
.yt-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.yt-wrapper video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.text-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 1em;
  background: green;
  color: #fff;
}
</style>