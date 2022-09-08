<template>
  <div id="app">
    <nav>
      <ul>
        <li>
          <router-link to="/stack-grid">Stack Grid</router-link>
        </li>
        <li>
          <router-link to="/virtual-collection">Virtual Collection</router-link>
        </li>
        <li>
          <router-link to="/my-grid-1">My Grid 1</router-link>
        </li>
        <li>
          <router-link to="/my-grid-2">My Grid 2</router-link>
        </li>
        <li>
          <router-link to="/my-grid-3">My Grid 3</router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

nav {
  margin-bottom: 1em;
}
nav ul {
  display: flex;
  flex-direction: row;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
}
nav li {
  margin: 0 1em;
}
</style>
