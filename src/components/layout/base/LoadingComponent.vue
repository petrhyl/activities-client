<template>
    <div class="loading-component">
        <div class="icon"></div>
        <h4>{{ content }}</h4>
    </div>
</template>


<script setup lang="ts">


const props = withDefaults(defineProps<{
    content?: string
}>(), { content: 'Loading...' });
</script>


<style scoped>
.loading-component{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    padding-top: 20%;
    z-index: 100;
}

.loading-component .icon{
    width: 50px;
    height: 50px;
    min-width: 30px;
    min-height: 30px;
    background: linear-gradient(50deg, #b7ffe7, #1c7db4, #92d7ff);
    border-radius: 5px;
}
</style>