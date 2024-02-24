<template>
  <NavBar />
  <main @click="handleCloseModal">
    <RouterView />
  </main>
</template>



<script setup lang="ts">
import { type Ref, ref, onBeforeMount, provide, onMounted, reactive } from 'vue';
import NavBar from './components/definite/NavBar.vue';
import { WindowWidth } from './utils/constanses/enums';
import { keyProvidedModalState, keyProvidedWindowWidth } from './utils/providedKey';
import { useUserStore } from './stores/user';
import { ModalInState } from './utils/objects/ModalInState';
import { OptionsParentElementsCount } from './utils/constanses/optionsPopupConsts';
import { useRouter } from 'vue-router';


const userStore = useUserStore()
const router = useRouter()

const currentWindowWidth: Ref<WindowWidth> = ref(WindowWidth.COMMON)
const modalInState = reactive<ModalInState>(new ModalInState())

const setOpenModal = (id: string, identifier: string) => {
  modalInState.id = id
  modalInState.isOpen = true
  modalInState.elementId = identifier
}

const setCloseModal = () => {
  modalInState.isOpen = false
}

provide(keyProvidedWindowWidth, currentWindowWidth)
provide(keyProvidedModalState, { modalInState, setOpenModal, setCloseModal })


const handleCloseModal = (ev: Event) => {
  if (!modalInState.isOpen) {
    return
  }

  if (ev.target instanceof HTMLElement) {
    let resolvingTarget = ev.target as HTMLElement

    for (let index = 0; index < OptionsParentElementsCount; index++) {
      if (resolvingTarget?.id === modalInState.elementId) {
        return
      }

      if (!resolvingTarget.parentElement) {
        break
      }

      resolvingTarget = resolvingTarget.parentElement
    }

    modalInState.isOpen = false
  }
}

onBeforeMount(() => {
  addWindowWidthListeners()
  userStore.loadApplicationUserFromCookies()
})

onMounted(() => {
  acertainWidth()
})

const acertainWidth = () => {
  if (window.innerWidth <= WindowWidth.PHONE) {
    currentWindowWidth.value = WindowWidth.PHONE
  } else if (window.innerWidth <= WindowWidth.TABLET) {
    currentWindowWidth.value = WindowWidth.TABLET
  } else if (window.innerWidth <= WindowWidth.SMALL) {
    currentWindowWidth.value = WindowWidth.SMALL
  } else if (window.innerWidth >= WindowWidth.SUPER_LARGE) {
    currentWindowWidth.value = WindowWidth.SUPER_LARGE
  } else if (window.innerWidth >= WindowWidth.LARGE) {
    currentWindowWidth.value = WindowWidth.LARGE
  } else {
    currentWindowWidth.value = WindowWidth.COMMON
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
}

main {
  width: 100%;
  min-height: calc(100vh - 85px);
  background-color: antiquewhite;
}

h1,
h2,
h3 {
  font-family: 'Gill Sans', Calibri, 'Trebuchet MS', sans-serif;
  margin: 0;
}

a {
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

.cancel-btn {
  color: #e2e2e2;
  background-color: #8da2ae;
}


.confirm-btn:hover,
.cancel-btn:hover {
  filter: brightness(1.2);
}

.confirm-btn {
  color: var(--dark-blue-color);
  background-color: var(--azure-color);
}
</style>./utils/constanses/optionsPopupConsts