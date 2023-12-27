<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
</template>



<script setup lang="ts">
import { type Ref, ref, onBeforeMount, provide, type ComputedRef, computed, onMounted } from 'vue';
import NavBar from './components/layout/base/NavBar.vue';
import { WindowWidth } from './utils/constanses/enums';
import { keyProvidedWindowWidth } from './models/auxillary/providedKey';
import { useUserStore } from './stores/user';


const userStore = useUserStore()

const currentWindowWidth: Ref<WindowWidth> = ref(WindowWidth.COMMON)
const mainContentWidth: Ref<string> = ref('75%')

provide(keyProvidedWindowWidth, currentWindowWidth)

onBeforeMount(() => {  
  addWindowWidthListeners()  
  userStore.loadApplicationUserFromCookies()
});

onMounted(()=>{
  acertainWidth()  
})

const acertainWidth = () => {
  if (window.innerWidth <= WindowWidth.PHONE) {
    currentWindowWidth.value = WindowWidth.PHONE
    mainContentWidth.value = '95%'
  } else if (window.innerWidth <= WindowWidth.TABLET) {
    currentWindowWidth.value = WindowWidth.TABLET
    mainContentWidth.value = '95%'
  } else if (window.innerWidth <= WindowWidth.SMALL) {
    currentWindowWidth.value = WindowWidth.SMALL
    mainContentWidth.value = '95%'
  } else if (window.innerWidth >= WindowWidth.SUPER_LARGE) {
    currentWindowWidth.value = WindowWidth.SUPER_LARGE
    mainContentWidth.value = '75%'
  } else if (window.innerWidth >= WindowWidth.LARGE) {
    currentWindowWidth.value = WindowWidth.LARGE
    mainContentWidth.value = '75%'
  } else {
    currentWindowWidth.value = WindowWidth.COMMON
    mainContentWidth.value = '75%'
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
  width: v-bind(mainContentWidth);
  margin: 0 auto;
}

h1,
h2,
h3 {
  font-family: 'Gill Sans', Calibri, 'Trebuchet MS', sans-serif;
  margin: 0;
}

a{
  text-decoration: none;
}

.form-input-element {
    width: 100%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    outline: none;
    border-radius: 5px;
    border: 1px solid var(--light-gray-color);
    padding: 7px 10px;
}

</style>
