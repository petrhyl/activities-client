<template>
    <div class="page-container">
        <slot></slot>
    </div>
</template>


<script setup lang="ts">
import { keyProvidedWindowWidth } from '@/models/auxillary/providedKey';
import { WindowWidth } from '@/utils/constanses/enums';
import { inject, watch, ref, type Ref, onBeforeMount } from 'vue';


const windowWidth = inject(keyProvidedWindowWidth, ref(WindowWidth.COMMON))

const currentPageWidth: Ref<string> = ref('75%')


const acertainWidth = () => {
    switch (windowWidth?.value) {
        case WindowWidth.PHONE:
            currentPageWidth.value = '97%'
            break
        case WindowWidth.TABLET:
        case WindowWidth.SMALL:
            currentPageWidth.value = '95%'
            break
        case WindowWidth.COMMON:
            currentPageWidth.value = '85%'
            break
        case WindowWidth.SUPER_LARGE:
            currentPageWidth.value = '70%'
        default:
            currentPageWidth.value = '75%'
            break
    }
}

onBeforeMount(() => {
    acertainWidth()
})

watch(windowWidth, () => {
    acertainWidth()
})
</script>


<style scoped>
.page-container {
    position: relative;
    width: v-bind(currentPageWidth);
    margin: 0 auto;
    padding: 20px 0;
}
</style>