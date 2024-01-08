<template>
    <div class="photo-options">
        <input type="button" class="photo-option-item" value="Set as profile photo" @click="emits('set-as-main')">
        <input type="button" class="photo-option-item" value="Delete" @click="emits('delte-photo')">
    </div>
</template>


<script setup lang="ts">

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

.photo-options>input {
    border: none;
    outline: none;
    background-color: transparent;
    padding: 5px 8px;
    cursor: pointer;
}

.photo-options>input:hover {
    text-shadow: 0 0 1px var(--dark-blue-color);
}
</style>