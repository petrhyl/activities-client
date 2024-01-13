<template>
    <div class="photo-options">
        <div v-if="isSetAsMain" class="photo-option-item">Is set as profile photo</div>
        <input v-else type="button" class="photo-option-item" value="Set as profile photo" @click="emits('set-as-main')">
        <input type="button" class="photo-option-item" value="Delete" @click="emits('delte-photo')">
    </div>
</template>


<script setup lang="ts">

const props = defineProps<{
    isSetAsMain: boolean
}>()

const emits = defineEmits<{
    (e: 'set-as-main'): void,
    (e: 'delte-photo'): void
}>()
</script>


<style scoped>
.photo-options {
    display: flex;
    flex-direction: column;
    background-color: #fcffeacc;
    box-shadow: 0 0 3px 2px #fcffeacc;
}

.photo-option-item{
    padding: 5px 8px;
    font-family: sans-serif;
    font-size: 11pt;
}

.photo-options>input {
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
}

.photo-options>input:hover {
    text-shadow: 0 0 1px var(--dark-blue-color);
}
</style>