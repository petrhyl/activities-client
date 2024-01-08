<template>
    <RouterLink v-if="isLink && linkTo" :class="getCssClass" :to="linkTo">{{ text }}</RouterLink>
    <input v-if="!isLink" :type="getType" :class="getCssClass" :value="text" @click="emits('click-button')" :disabled="isDisabled">
</template>


<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import ButtonTypes from "@/utils/constanses/ButtonTypes";
import type { LocationAsRelativeRaw } from 'vue-router';


const props = defineProps<{
    buttonType: string,
    text: string,
    cssClass?: string,
    isFontSmaller?: boolean,
    linkTo?: LocationAsRelativeRaw,
    isDisabled?: boolean
}>()

const emits = defineEmits<{
    (e: 'click-button'): void
}>()


const getCssClass: ComputedRef<{}> = computed(() => {
    let css = 'ordinary-button'
    if (props.cssClass) {
        css += ` ${props.cssClass}`   
    }

    if (props.isDisabled) {
        css += ' button-disabled'
    }

    return css
})
const getType: ComputedRef<string> = computed(() => {
    return `${props.buttonType}`
})
const isLink: ComputedRef<boolean> = computed(() => {
    return props.buttonType === ButtonTypes.LINK;
})
const getFontSize: ComputedRef<string> = computed(()=>{
    if (props.isFontSmaller) {
        return '11pt'
    }

    return '12pt'
})

</script>


<style scoped>
.ordinary-button {
    height: fit-content;
    font-size: v-bind(getFontSize);
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    text-align: center;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 7px 12px;
    cursor: pointer;
}

.ordinary-button.button-disabled{
    opacity: 0.6;
    pointer-events: none;
}
</style>
