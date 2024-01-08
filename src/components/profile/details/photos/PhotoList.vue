<template>
    <ul ref="ul" class="photo-list">
        <PhotoItem
            v-for="photo in photos"
            :photo="photo"
            @set-as-main="handleSetAsMain"
            @delete-photo="handleDelete" />
    </ul>
</template>


<script setup lang="ts">
import type { PhotoImage } from '@/models/User';
import PhotoItem from './PhotoItem.vue';


const props = defineProps<{
    photos: PhotoImage[]
}>()

const emits = defineEmits<{
    (e: 'set-as-main', photoId: string): void,
    (e: 'delete-photo', photoId: string): void
}>()


const handleSetAsMain = (photoId: string) => {
    emits('set-as-main', photoId)
}

const handleDelete = (photoId: string) => {
    emits('delete-photo', photoId)
}
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
</style>