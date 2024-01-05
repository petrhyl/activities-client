<template>
    <ul class="photo-list">
        <li
            v-for="photo in photos"
            class="photo-element">
            <img
                :src="photo.url"
                :alt="`photo_${photo.id}`">
        </li>
    </ul>
</template>


<script setup lang="ts">
import type { PhotoImage } from '@/models/User';
import { keyProvidedWindowWidth } from '@/models/auxillary/providedKey';
import { WindowWidth } from '@/utils/constanses/enums';
import { computed, inject, type ComputedRef } from 'vue';


const props = defineProps<{
    photos: PhotoImage[]
}>()


const windowWidth = inject(keyProvidedWindowWidth)

const getImageWidth: ComputedRef<string> = computed(() => {
    switch (windowWidth?.value) {
        case WindowWidth.PHONE:
            return '50%'
        case WindowWidth.TABLET:
        case WindowWidth.SMALL:
            return '33%'
        default:
            return '20%'
    }
})

</script>


<style scoped>
.photo-list {
    --photo-gap: 20px;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
    gap: var(--photo-gap)
}

.photo-element {
    width: calc(v-bind(getImageWidth) - var(--photo-gap));
}

.photo-element img {
    width: 100%;
}
</style>