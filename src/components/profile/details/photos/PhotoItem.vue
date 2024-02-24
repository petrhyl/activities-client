<template>
    <li class="photo-element">
        <OptionsComponent
            v-if="isCurrentUserProfile"
            class="photo-options"
            :popup-id-sufix="photo.id">
            <PhotoItemOptions
                :is-set-as-main="photo.isMain"
                @set-as-main="handleSetAsMain"
                @delte-photo="handleDelete" />
        </OptionsComponent>
        <img
            :src="photo.url"
            :alt="`photo_${photo.id}`" />
    </li>
</template>


<script setup lang="ts">
import type { PhotoImage } from '@/models/User';
import { keyProvidedWindowWidth } from '@/utils/providedKey';
import { WindowWidth } from '@/utils/constanses/enums';
import { computed, inject, type ComputedRef } from 'vue';
import PhotoItemOptions from './PhotoItemOptions.vue';
import OptionsComponent from '@/components/layout/OptionsComponent.vue';


const props = defineProps<{
    photo: PhotoImage,
    isCurrentUserProfile: boolean
}>()

const emits = defineEmits<{
    (e: 'set-as-main', id: string): void,
    (e: 'delete-photo', id: string): void
}>()


const windowWidth = inject(keyProvidedWindowWidth)


const getImageWidth: ComputedRef<string> = computed(() => {
    switch (windowWidth?.value) {
        case WindowWidth.PHONE:
            return '50%'
        case WindowWidth.TABLET:
        case WindowWidth.SMALL:
            return '33%'
        case WindowWidth.COMMON:
            return '25%'
        default:
            return '20%'
    }
})


const handleSetAsMain = () => {
    emits('set-as-main', props.photo.id)
}

const handleDelete = () => {
    emits('delete-photo', props.photo.id)
}

</script>


<style scoped>
.photo-element {
    position: relative;
    width: calc(v-bind(getImageWidth) - var(--photo-gap));
}

.photo-element img {
    width: 100%;
}

.photo-element:deep() .photo-options {
    padding: 8px;
}
</style>