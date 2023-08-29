<template>
    <div class="row" :style="gridColumnsWidth">
        <img :src="imageSource" :alt="imageAlternativeText">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed, type ComputedRef, type StyleValue } from 'vue';


const props = defineProps<{
    imageSource: string,
    imageAlternativeText: string,
    imageWidth?: number
}>();

const gridColumnsWidth: ComputedRef<StyleValue> = computed(() => {
    if (props.imageWidth === undefined || props.imageWidth === null) {
        return { gridTemplateColumns: '30px auto' };
    }

    return { gridTemplateColumns: `${props.imageWidth}px auto` };
});

</script>


<style scoped>
.row {
    width: 100%;
    display: grid;
    column-gap: 25px;
}

.row img {
    width: 100%;
    height: auto;
}
</style>