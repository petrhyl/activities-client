<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import NavBar from './components/layout/NavBar.vue';


</script>

<style>
* {
  box-sizing: border-box;
}

body{
  margin: 0;
  padding: 0;
  background-color: #fef8e6;
}

main{
  width: 85%;
  margin: 0 auto;
}

.card{
    background-color: aliceblue;
    box-shadow: 1px 1px 4px 1px #c8c8c8;
    border-radius: 5px;
    padding: 10px 10px;
}

h2{
  font-family: 'Gill Sans', Calibri, 'Trebuchet MS', sans-serif;
}
</style>
