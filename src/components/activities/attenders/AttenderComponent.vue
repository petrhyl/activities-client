<template>
    <div class="single-attender">
        <ImageComponent
            image-css="attender-image"
            :image-url="attendee.attender.imageUrl"
            alternative-image-text="attender"
            :use-alternative-element="true">
            <img src="@/assets/user.png" alt="attender" class="attender-image" />
        </ImageComponent>
        <div class="attender-info">
            <div class="attender-name">{{ attendee.attender.displayName }}</div>
            <slot></slot>
        </div>
    </div>
</template>


<script setup lang="ts">
import ImageComponent from '@/components/layout/ImageComponent.vue';
import type { Attendee } from '@/models/Activity';
import { computed, type ComputedRef } from 'vue';


const props = defineProps<{
    attendee: Attendee,
    attendersPictureSize: number,
    imageTextGap?: number
}>()


const getImageEdgeSize: ComputedRef<string> = computed(() => `${props.attendersPictureSize}px`)
const getGap: ComputedRef<string> = computed(() => {
    if (!props.imageTextGap) {
        return '15px'
    }

    return `${props.imageTextGap}px`
})
</script>


<style scoped>
img {
    width: 100%;
    height: auto;
}

.single-attender {
    display: flex;
    align-items: center;
    column-gap: v-bind(getGap);
}

.single-attender:deep() .attender-image {
    width: v-bind(getImageEdgeSize);
    height: v-bind(getImageEdgeSize);
    border-radius: 50%;
    overflow: hidden;
}

.attender-info {
    display: flex;
    align-items: center;
    gap: v-bind(getGap);
}
</style>