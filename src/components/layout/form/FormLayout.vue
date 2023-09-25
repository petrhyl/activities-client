<template>
    <form @submit.prevent="emits('submit-form')" :class="cssStyle">
        <slot></slot>
        <span v-if="invalidMessage !== ''" class="invalid-input-message">{{ invalidMessage }}</span>
    </form>
</template>

<script setup lang="ts">
import { computed } from 'vue';


const props = withDefaults(defineProps<{
    formStyles: string,
    invalidMessage: string
}>(), { invalidMessage: '' });

const emits = defineEmits<{
    (e: 'submit-form'): void
}>();

const cssStyle = computed(() => {
    return `${props.formStyles} form`
});

</script>

<style scoped>
.form {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 15px;
}

.invalid-input-message {
    font-size: 11pt;
    color: var(--warning-color);
    margin-top: 10px;
}
</style>
