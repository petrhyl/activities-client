<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import NavBar from './components/layout/base/NavBar.vue';


</script>

<style>
@import url('@/styles/variables.css');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
  background-color: #fef8e6;
}

main {
  width: 75%;
  margin: 0 auto;
}

.card {
  background-color: #f1f7fd;
  box-shadow: 1px 1px 4px 1px #c8c8c8;
  overflow: hidden;
  border-radius: 5px;
  padding: 12px 15px;
}

h1,
h2,
h3 {
  font-family: 'Gill Sans', Calibri, 'Trebuchet MS', sans-serif;
  margin: 0;
}

@media screen and (max-width: 1200px) {
  main {
    width: 95%;
  }
}

@media screen and (max-width: 980px) {
  main {
    width: 95%;
  }
}
</style>
