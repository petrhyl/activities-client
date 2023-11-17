<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
</template>



<script setup lang="ts">
import { type Ref, ref, onBeforeMount, provide } from 'vue';
import NavBar from './components/layout/base/NavBar.vue';
import { WindowWidth } from './utils/constanses/enums';
import { keyProvidedWindowWidth } from './models/auxillary/providedKey';
import { useUserStore } from './stores/user';


const userStore = useUserStore()

const currentWindowWidth: Ref<WindowWidth> = ref(WindowWidth.COMMON)

provide(keyProvidedWindowWidth, currentWindowWidth)

onBeforeMount(() => {
  addWindowWidthListeners()
  tryLogUserIn()
});

const acertainWidth = () => {
  if (window.innerWidth <= WindowWidth.PHONE) {
    currentWindowWidth.value = WindowWidth.PHONE;
  } else if (window.innerWidth <= WindowWidth.TABLET) {
    currentWindowWidth.value = WindowWidth.TABLET;
  } else if (window.innerWidth <= WindowWidth.SMALL) {
    currentWindowWidth.value = WindowWidth.SMALL;
  } else if (window.innerWidth >= WindowWidth.SUPER_LARGE) {
    currentWindowWidth.value = WindowWidth.SUPER_LARGE;
  } else if (window.innerWidth >= WindowWidth.LARGE) {
    currentWindowWidth.value = WindowWidth.LARGE;
  } else {
    currentWindowWidth.value = WindowWidth.COMMON;
  }
}

const addWindowWidthListeners = () => {
  window.matchMedia(`(max-width:${WindowWidth.PHONE}px)`).addEventListener('change', () => {
    acertainWidth()
  });
  window.matchMedia(`(max-width:${WindowWidth.TABLET}px)`).addEventListener('change', () => {
    acertainWidth()
  });
  window.matchMedia(`(max-width:${WindowWidth.SMALL}px)`).addEventListener('change', () => {
    acertainWidth()
  });
  window.matchMedia(`(max-width:${WindowWidth.LARGE}px)`).addEventListener('change', () => {
    acertainWidth()
  });
  window.matchMedia(`(max-width:${WindowWidth.SUPER_LARGE}px)`).addEventListener('change', () => {
    acertainWidth()
  });
}

const tryLogUserIn = () => {
  const token = userStore.getCurrentUserToken
  if (token) {
    userStore.getCurrentUserByToken(token)
  }
}
</script>




<style>
@import url('@/styles/variables.css');

* {
  box-sizing: border-box;
  color: var(--dark-font-color);
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

.form-input-element {
    width: 100%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    outline: none;
    border-radius: 5px;
    border: 1px solid var(--light-gray-color);
    padding: 7px 10px;
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
