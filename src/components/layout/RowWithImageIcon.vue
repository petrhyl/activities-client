<template>
    <div class="row" :style="gridColumnsWidth">
        <div class="content-container">
            <img :src="imageSource" :alt="imageAlternativeText">
        </div>
        <div class="content-container">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, type StyleValue } from 'vue';


const props = withDefaults(defineProps<{
    imageSource: string,
    imageAlternativeText: string,
    imageWidth?: number,
    imageMargin?: number
}>(), {
    imageWidth: 30,
    imageMargin: 25
})

const gridColumnsWidth: ComputedRef<StyleValue> = computed(() => {
    return { gridTemplateColumns: `${props.imageWidth}px auto` };
})
const getGap: ComputedRef<string> = computed(() => {
    return `${props.imageMargin}px`
})

</script>


<style scoped>
.row {
    width: 100%;
    display: grid;
    column-gap: v-bind(getGap);
}

.row img {
    width: 100%;
    height: auto;
}

.content-container {
    display: flex;
    align-items: center;
}
</style>