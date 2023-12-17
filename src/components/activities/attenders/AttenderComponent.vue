<template>
    <div class="single-attender">
        <ImageComponent css-clases="attender-image" :image-url="attendee.attender.imageUrl"
            alternative-image-text="attender" :use-alternative-element="true">
            <img src="@/assets/user.png" alt="attender" />
        </ImageComponent>
        <div class="attender-name">{{ attendee.attender.displayName }}</div>
    </div>
</template>


<script setup lang="ts">
import ImageComponent from '@/components/layout/ImageComponent.vue';
import type { Attendee } from '@/models/Activity';
import { computed, type ComputedRef } from 'vue';


const props = defineProps<{
    attendee: Attendee,
    attendersPictureSize: number
}>()


const getImageEdgeSize: ComputedRef<string> = computed(()=>{
    return `${props.attendersPictureSize}px`
})
</script>

<style>
.attender-image{
    width: v-bind(getImageEdgeSize);
    height: v-bind(getImageEdgeSize);
    border-radius: 50%;
    overflow: hidden;
}
</style>

<style scoped>
img{
    width: 100%;
    height: auto;
}

.single-attender{
    display: flex;
    align-items: center;
    column-gap: 15px;
}
</style>