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
    linkTo?: LocationAsRelativeRaw,
    isDisabled?: boolean
}>()

const emits = defineEmits<{
    (e: 'click-button'): void
}>();

const getCssClass: ComputedRef<{}> = computed(() => {
    return `ordinary-button ${props.cssClass ?? ''}`;
});

const getType: ComputedRef<string> = computed(() => {
    return `${props.buttonType}`
});

const isLink: ComputedRef<boolean> = computed(() => {
    return props.buttonType === ButtonTypes.LINK;
});

const isButtonDisabled: ComputedRef<boolean> = computed(()=>{
    if (props.isDisabled === undefined || props.isDisabled === null) {
        return false;
    }

    return props.isDisabled;
});

</script>


<style scoped>
.ordinary-button {
    height: fit-content;
    font-size: 12pt;
    font-weight: 600;
    font-family: Arial, Helvetica, sans-serif;
    text-decoration: none;
    text-align: center;
    outline: none;
    border: none;
    border-radius: 5px;
    padding: 8px 15px;
    cursor: pointer;
}
</style>
