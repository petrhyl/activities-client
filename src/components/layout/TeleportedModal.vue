<template>
    <Teleport :to="props.teleportTo">
        <div class="placeholder">
            <div class="container" @click.self="emits('click-background')" @scroll.prevent>
                <div class="modal">
                    <div class="title">{{ title }}</div>
                    <div class="content">{{ content }}</div>
                    <div class="controls">
                        <StyledButton
                            :button-type="ButtonTypes.BUTTON"
                            css-class="modal-cancel-button"
                            :is-font-smaller="true"
                            :text="props.cancelButtonText"
                            :is-disabled="areButtonsDisabled"
                            @click-button="handleCancel" />
                        <StyledButton
                            :button-type="ButtonTypes.BUTTON"
                            css-class="modal-confirm-button"
                            :is-font-smaller="true"
                            :text="props.confirmButtonText"
                            :is-disabled="areButtonsDisabled"
                            @click-button="handleConfirm" />
                    </div>
                </div>
            </div>
        </div>
    </Teleport>
</template>


<script setup lang="ts">
import ButtonTypes from '@/utils/constanses/ButtonTypes';
import StyledButton from './form/StyledButton.vue';
import { computed, ref, type ComputedRef, type Ref, watch } from 'vue';


const props = withDefaults(defineProps<{
    title?: string,
    content: string,
    cancelButtonText?: string,
    confirmButtonText?: string,
    teleportTo?: string
}>(), {
    cancelButtonText: 'Cancel',
    confirmButtonText: 'OK',
    teleportTo: 'body'
})


const emits = defineEmits<{
    (e: 'cancel-button'): void,
    (e: 'confirm-button'): void,
    (e: 'click-background'): void
}>()


const getParentElement: ComputedRef<HTMLElement | null> = computed(() => document.querySelector(props.teleportTo))

const areButtonsDisabled: Ref<boolean> = ref(false)
const getContainerWidth: ComputedRef<string> = computed(() => {
    if (!getParentElement.value) {
        return '100vw'
    }

    return `${getParentElement.value.offsetWidth}px`
})
const getContainerHeight: ComputedRef<string> = computed(() => {
    if (!getParentElement.value) {
        return '100vh'
    }

    return `${getParentElement.value.offsetHeight}px`
})


const handleCancel = () => {
    areButtonsDisabled.value = true
    emits('cancel-button')
}

const handleConfirm = () => {
    areButtonsDisabled.value = true
    emits('confirm-button')
}

</script>


<style>
.modal-cancel-button {
    color: #e2e2e2;
    background-color: #8da2ae;
}

.modal-confirm-button {
    color: var(--dark-blue-color);
    background-color: var(--azure-color);
}

.modal-cancel-button:hover,
.modal-confirm-button:hover {
    filter: brightness(1.2);
}
</style>


<style scoped>
.placeholder {
    position: relative;
    width: 0 !important;
    height: 0 !important;
}

.container {
    position: absolute;
    width: v-bind(getContainerWidth);
    height: v-bind(getContainerHeight);
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #8282826b;
}

.modal {
    width: 320px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: antiquewhite;
    padding: 10px;
    border: 1px solid #626262;
    border-radius: 5px;
}

.modal>div {
    width: 100%;
}

.title {
    text-align: center;
    font-weight: 600;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 12pt;
    color: var(--dark-blue-color);
}

.content {
    text-align: justify;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-size: 11pt;
}

.controls {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 15px;
}
</style>